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
  mainImageUrl: true,
  imageUrls: true,
  establishment: { select: { ownerId: true } },
} satisfies Prisma.ServiceOfferSelect;

type Row = Prisma.ServiceOfferGetPayload<{ select: typeof select }>;

@Injectable()
export class ServiceOfferImageTarget implements ImageTarget {
  readonly entity = 'service-offer' as const;
  readonly profileField = null;
  readonly profileSlot = null;

  constructor(private readonly prisma: PrismaService) {}

  async load(
    slug: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord> {
    const row = await (tx ?? this.prisma).serviceOffer.findFirst({
      where: { slug, deletedAt: null },
      select,
    });
    if (!row) throw new NotFoundException('Oferta de serviço não encontrada');
    return this.toRecord(row);
  }

  async update(
    slug: string,
    data: ImageFieldsPatch,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord> {
    // Oferta não tem campo de perfil: profileUrl é ignorado.
    const { mainImageUrl, imageUrls } = data;
    const row = await (tx ?? this.prisma).serviceOffer.update({
      where: { slug },
      data: { mainImageUrl, imageUrls },
      select,
    });
    return this.toRecord(row);
  }

  async collectUrls(slug: string): Promise<string[]> {
    const record = await this.load(slug);
    return [record.mainImageUrl, ...record.imageUrls].filter(
      (u): u is string => !!u,
    );
  }

  private toRecord(row: Row): ImageTargetRecord {
    return {
      id: row.id,
      slug: row.slug,
      ownerUserId: row.establishment.ownerId,
      profileUrl: null,
      mainImageUrl: row.mainImageUrl,
      imageUrls: row.imageUrls,
    };
  }
}
