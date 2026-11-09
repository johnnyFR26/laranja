import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import {
  ImageFieldsPatch,
  ImageTarget,
  ImageTargetRecord,
} from './image-target.interface';

const select = {
  id: true,
  slug: true,
  ownerId: true,
  logoUrl: true,
  mainImageUrl: true,
  imageUrls: true,
} satisfies Prisma.EstablishmentSelect;

type Row = Prisma.EstablishmentGetPayload<{ select: typeof select }>;

@Injectable()
export class EstablishmentImageTarget implements ImageTarget {
  readonly entity = 'establishment' as const;
  readonly profileField = 'logoUrl' as const;
  readonly profileSlot = 'logo' as const;

  constructor(private readonly prisma: PrismaService) {}

  async load(
    slug: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord> {
    const row = await (tx ?? this.prisma).establishment.findFirst({
      where: { slug, deletedAt: null },
      select,
    });
    if (!row) throw new NotFoundException('Estabelecimento não encontrado');
    return this.toRecord(row);
  }

  async update(
    slug: string,
    data: ImageFieldsPatch,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord> {
    const { profileUrl, ...rest } = data;
    const row = await (tx ?? this.prisma).establishment.update({
      where: { slug },
      data: {
        ...rest,
        ...(profileUrl !== undefined && { logoUrl: profileUrl }),
      },
      select,
    });
    return this.toRecord(row);
  }

  /** Inclui as imagens das ofertas do estabelecimento. */
  async collectUrls(slug: string): Promise<string[]> {
    const row = await this.prisma.establishment.findFirst({
      where: { slug },
      select: {
        logoUrl: true,
        mainImageUrl: true,
        imageUrls: true,
        serviceOffers: { select: { mainImageUrl: true, imageUrls: true } },
      },
    });
    if (!row) throw new NotFoundException('Estabelecimento não encontrado');
    return [
      row.logoUrl,
      row.mainImageUrl,
      ...row.imageUrls,
      ...row.serviceOffers.flatMap((o) => [o.mainImageUrl, ...o.imageUrls]),
    ].filter((u): u is string => !!u);
  }

  private toRecord(row: Row): ImageTargetRecord {
    return {
      id: row.id,
      slug: row.slug,
      ownerUserId: row.ownerId,
      profileUrl: row.logoUrl,
      mainImageUrl: row.mainImageUrl,
      imageUrls: row.imageUrls,
    };
  }
}
