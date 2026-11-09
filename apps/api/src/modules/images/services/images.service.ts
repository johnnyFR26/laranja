import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ImageSetResponseDto } from '../dto';
import { ImageEntityType, MAX_GALLERY_SIZE } from '../image.constants';
import { ValidatedImage } from '../pipes/image-file.pipe';
import { StorageService } from '../../storage/services/storage.service';
import {
  ImageFieldsPatch,
  ImageTarget,
  ImageTargetRecord,
} from '../targets/image-target.interface';
import { ImageTargetRegistry } from '../targets/image-target.registry';
import {
  ImageAuthorizationService,
  ImageCurrentUser,
} from './image-authorization.service';

export type SingleImageSlot = 'avatar' | 'logo' | 'main';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    private readonly registry: ImageTargetRegistry,
    private readonly authorization: ImageAuthorizationService,
    private readonly storage: StorageService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Define/substitui avatar, logo ou imagem principal.
   * Upload -> persistência (compensa em caso de falha) -> remoção best effort do objeto antigo.
   */
  async setSingle(
    entity: ImageEntityType,
    slug: string,
    slot: SingleImageSlot,
    file: ValidatedImage,
    user: ImageCurrentUser,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);
    this.assertSlotSupported(target, slot);

    const record = await target.load(slug);
    this.authorization.assertCanWrite(record, user);

    const previousUrl = this.currentValue(target, record, slot);

    const key = this.storage.buildKey(entity, slug, slot, file.ext);
    const { url: newUrl } = await this.storage.upload({
      key,
      body: file.buffer,
      contentType: file.mimeType,
    });

    let updated: ImageTargetRecord;
    try {
      updated = await target.update(slug, this.patchFor(slot, newUrl));
    } catch (error) {
      await this.compensate(newUrl);
      throw error;
    }

    if (previousUrl && previousUrl !== newUrl) {
      await this.deleteIfUnreferenced(previousUrl, updated);
    }

    return this.toResponse(target, updated);
  }

  /** Remove avatar, logo ou principal: banco primeiro, objeto depois (best effort). */
  async removeSingle(
    entity: ImageEntityType,
    slug: string,
    slot: SingleImageSlot,
    user: ImageCurrentUser,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);
    this.assertSlotSupported(target, slot);

    const record = await target.load(slug);
    this.authorization.assertCanWrite(record, user);

    const previousUrl = this.currentValue(target, record, slot);
    if (!previousUrl) {
      return this.toResponse(target, record);
    }

    const updated = await target.update(slug, this.patchFor(slot, null));
    await this.deleteIfUnreferenced(previousUrl, updated);

    return this.toResponse(target, updated);
  }

  /**
   * Adiciona arquivos ao final da galeria.
   * Limite validado antes de qualquer upload (422) e revalidado dentro da transação.
   */
  async addToGallery(
    entity: ImageEntityType,
    slug: string,
    files: ValidatedImage[],
    user: ImageCurrentUser,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);

    const record = await target.load(slug);
    this.authorization.assertCanWrite(record, user);

    this.assertGalleryLimit(entity, record.imageUrls.length, files.length);

    const uploaded: string[] = [];
    try {
      for (const file of files) {
        const key = this.storage.buildKey(entity, slug, 'gallery', file.ext);
        const { url } = await this.storage.upload({
          key,
          body: file.buffer,
          contentType: file.mimeType,
        });
        uploaded.push(url);
      }

      const updated = await this.prisma.$transaction(async (tx) => {
        const current = await target.load(slug, tx);
        this.assertGalleryLimit(entity, current.imageUrls.length, uploaded.length);
        return target.update(
          slug,
          { imageUrls: [...current.imageUrls, ...uploaded] },
          tx,
        );
      });

      return this.toResponse(target, updated);
    } catch (error) {
      await Promise.all(uploaded.map((url) => this.compensate(url)));
      throw error;
    }
  }

  /** Remove uma URL da galeria: banco primeiro, objeto depois (só se não referenciado). */
  async removeFromGallery(
    entity: ImageEntityType,
    slug: string,
    url: string,
    user: ImageCurrentUser,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);

    const record = await target.load(slug);
    this.authorization.assertCanWrite(record, user);

    const updated = await this.prisma.$transaction(async (tx) => {
      const current = await target.load(slug, tx);
      this.assertInGallery(current, url);
      return target.update(
        slug,
        { imageUrls: current.imageUrls.filter((item) => item !== url) },
        tx,
      );
    });

    await this.deleteIfUnreferenced(url, updated);
    return this.toResponse(target, updated);
  }

  /** Define a imagem principal a partir de uma URL da galeria (sem duplicar objeto). */
  async promoteToMain(
    entity: ImageEntityType,
    slug: string,
    url: string,
    user: ImageCurrentUser,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);

    const record = await target.load(slug);
    this.authorization.assertCanWrite(record, user);

    let previousUrl: string | null = null;
    const updated = await this.prisma.$transaction(async (tx) => {
      const current = await target.load(slug, tx);
      this.assertInGallery(current, url);
      previousUrl = current.mainImageUrl;
      return target.update(slug, { mainImageUrl: url }, tx);
    });

    if (previousUrl && previousUrl !== url) {
      await this.deleteIfUnreferenced(previousUrl, updated);
    }
    return this.toResponse(target, updated);
  }

  /** Reordena a galeria; exige permutação exata da galeria atual (400 caso contrário). */
  async reorderGallery(
    entity: ImageEntityType,
    slug: string,
    urls: string[],
    user: ImageCurrentUser,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);

    const record = await target.load(slug);
    this.authorization.assertCanWrite(record, user);

    const updated = await this.prisma.$transaction(async (tx) => {
      const current = await target.load(slug, tx);
      if (!this.isPermutation(current.imageUrls, urls)) {
        throw new BadRequestException(
          'A nova ordem deve conter exatamente as mesmas imagens da galeria, sem repetições',
        );
      }
      return target.update(slug, { imageUrls: [...urls] }, tx);
    });

    return this.toResponse(target, updated);
  }

  /** Lista as imagens da entidade (público, sem autorização). */
  async list(
    entity: ImageEntityType,
    slug: string,
  ): Promise<ImageSetResponseDto> {
    const target = this.registry.get(entity);
    const record = await target.load(slug);
    return this.toResponse(target, record);
  }

  /** 404 se a URL não estiver na galeria. */
  private assertInGallery(record: ImageTargetRecord, url: string): void {
    if (!record.imageUrls.includes(url)) {
      throw new NotFoundException('Imagem não encontrada na galeria');
    }
  }

  private isPermutation(current: string[], proposed: string[]): boolean {
    if (current.length !== proposed.length) return false;
    const unique = new Set(proposed);
    return (
      unique.size === proposed.length &&
      current.every((item) => unique.has(item))
    );
  }

  /** 422 se a galeria passaria do limite da entidade. */
  private assertGalleryLimit(
    entity: ImageEntityType,
    current: number,
    incoming: number,
  ): void {
    const max = MAX_GALLERY_SIZE[entity];
    if (current + incoming > max) {
      throw new UnprocessableEntityException(
        `A galeria comporta no máximo ${max} imagens (atual: ${current}, novas: ${incoming})`,
      );
    }
  }

  /** 404 se o slot não existir para a entidade (ex.: avatar em service-offer). */
  private assertSlotSupported(target: ImageTarget, slot: SingleImageSlot): void {
    if (slot !== 'main' && target.profileSlot !== slot) {
      throw new NotFoundException(
        `Slot "${slot}" não existe para ${target.entity}`,
      );
    }
  }

  private currentValue(
    target: ImageTarget,
    record: ImageTargetRecord,
    slot: SingleImageSlot,
  ): string | null {
    return slot === 'main' ? record.mainImageUrl : record.profileUrl;
  }

  private patchFor(slot: SingleImageSlot, url: string | null): ImageFieldsPatch {
    return slot === 'main' ? { mainImageUrl: url } : { profileUrl: url };
  }

  /** Apaga o novo objeto após falha de persistência (R8.2). Nunca lança. */
  private async compensate(url: string): Promise<void> {
    try {
      await this.storage.deleteByUrl(url);
    } catch {
      this.logger.warn(
        `Objeto órfão após falha de persistência: ${this.describe(url)}`,
      );
    }
  }

  /** Remove o objeto apenas se nenhum campo da entidade ainda o referenciar (best effort). */
  private async deleteIfUnreferenced(
    url: string,
    record: ImageTargetRecord,
  ): Promise<void> {
    const stillReferenced =
      record.mainImageUrl === url ||
      record.profileUrl === url ||
      record.imageUrls.includes(url);
    if (stillReferenced) return;

    try {
      await this.storage.deleteByUrl(url);
    } catch {
      this.logger.warn(`Objeto órfão no S3: ${this.describe(url)}`);
    }
  }

  private describe(url: string): string {
    return this.storage.toKey(url) ?? url;
  }

  private toResponse(
    target: ImageTarget,
    record: ImageTargetRecord,
  ): ImageSetResponseDto {
    const response = new ImageSetResponseDto();
    if (target.profileField) {
      response[target.profileField] = record.profileUrl;
    }
    response.mainImageUrl = record.mainImageUrl;
    response.imageUrls = record.imageUrls;
    return response;
  }
}
