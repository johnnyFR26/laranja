import { Injectable } from '@nestjs/common';
import { Establishment } from '../../../generated/client';
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
    return this.prisma.establishment.findUnique({
      where: { slug },
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
    return this.prisma.establishment.findUnique({
      where: { slug },
      include: ESTABLISHMENT_WITH_SERVICE_OFFERS_INCLUDE,
    });
  }
}
