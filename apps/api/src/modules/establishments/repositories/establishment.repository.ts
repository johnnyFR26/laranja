import { BadRequestException, Injectable } from '@nestjs/common';
import { Establishment, Prisma } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

const ESTABLISHMENT_WITH_SERVICE_OFFERS_INCLUDE = {
  owner: true,
  address: true,
  serviceOffers: {
    include: {
      category: true,
      _count: {
        select: {
          subscriptions: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' as const },
  },
} as const;

@Injectable()
export class EstablishmentRepository extends BaseRepository<Establishment> {
  constructor(prisma: PrismaService) {
    super(prisma, 'establishment');
  }

  async findBySlug(slug: string): Promise<Establishment | null> {
    const key = slug?.trim();
    if (!key) {
      throw new BadRequestException('Slug do estabelecimento é obrigatório');
    }
    return this.prisma.establishment.findUnique({
      where: { slug: key },
      include: {
        owner: true,
        address: true,
      },
    });
  }

  async findByOwner(ownerId: number): Promise<Establishment | null> {
    return this.prisma.establishment.findUnique({
      where: { ownerId },
      include: {
        owner: true,
        address: true,
        serviceOffers: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  async findWithServiceOffersBySlug(slug: string): Promise<Establishment | null> {
    const key = slug?.trim();
    if (!key) {
      throw new BadRequestException('Slug do estabelecimento é obrigatório');
    }
    return this.prisma.establishment.findUnique({
      where: { slug: key },
      include: ESTABLISHMENT_WITH_SERVICE_OFFERS_INCLUDE,
    });
  }

  override async update(slug: string, data: Partial<Establishment>): Promise<Establishment> {
    const key = slug?.trim();
    if (!key) {
      throw new BadRequestException('Slug do estabelecimento é obrigatório');
    }
    const cleaned = { ...(data as Record<string, unknown>) };
    delete cleaned['id'];
    delete cleaned['ownerId'];
    for (const k of Object.keys(cleaned)) {
      if (cleaned[k] === undefined) delete cleaned[k];
    }
    return this.prisma.establishment.update({
      where: { slug: key },
      data: cleaned as Prisma.EstablishmentUpdateInput,
    });
  }
}
