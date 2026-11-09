import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from '../../storage/services/storage.service';
import type { ImageEntityType } from '../image.constants';
import { ImageTargetRegistry } from '../targets/image-target.registry';

@Injectable()
export class ImageCleanupService {
  private readonly logger = new Logger(ImageCleanupService.name);

  constructor(
    private readonly registry: ImageTargetRegistry,
    private readonly storage: StorageService,
  ) {}

  /** Coleta as URLs de imagens da entidade (e filhos) antes da exclusão. */
  collect(entity: ImageEntityType, slug: string): Promise<string[]> {
    return this.registry.get(entity).collectUrls(slug);
  }

  /** Remove os objetos (best effort). Nunca lança; loga as chaves que falharem. */
  async purge(urls: string[]): Promise<void> {
    try {
      const unique = [
        ...new Set((urls ?? []).filter((u) => typeof u === 'string' && u)),
      ];
      if (unique.length === 0) return;

      const { failed } = await this.storage.deleteManyByUrl(unique);
      for (const url of failed) {
        const key = this.storage.toKey(url) ?? url;
        this.logger.warn(`Objeto órfão após exclusão (falha ao remover): ${key}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`Falha inesperada na limpeza de imagens: ${message}`);
    }
  }
}
