import { Prisma } from '../../../generated/client';
import { ImageEntityType } from '../image.constants';

export interface ImageTargetRecord {
  id: number;
  slug: string;
  /** user.id | establishment.ownerId | offer.establishment.ownerId */
  ownerUserId: number;
  /** avatarUrl (user), logoUrl (establishment), null (service-offer). */
  profileUrl: string | null;
  mainImageUrl: string | null;
  imageUrls: string[];
}

export interface ImageFieldsPatch {
  /** Grava em avatarUrl/logoUrl conforme a entidade (ignorado em service-offer). */
  profileUrl?: string | null;
  mainImageUrl?: string | null;
  imageUrls?: string[];
}

export interface ImageTarget {
  readonly entity: ImageEntityType;
  readonly profileField: 'avatarUrl' | 'logoUrl' | null;
  readonly profileSlot: 'avatar' | 'logo' | null;
  /** Carrega a entidade por slug (404 se não existir). */
  load(slug: string, tx?: Prisma.TransactionClient): Promise<ImageTargetRecord>;
  update(
    slug: string,
    data: ImageFieldsPatch,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord>;
  /** URLs de todas as imagens, incluindo filhos (ex.: ofertas do estabelecimento). */
  collectUrls(slug: string): Promise<string[]>;
}
