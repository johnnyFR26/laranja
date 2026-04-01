import { Injectable } from '@nestjs/common';
import { ServiceOffer } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IServiceOfferRepository } from '../contracts/service-offer-repository.interface';

const SERVICE_OFFER_RELATIONS = {
  category: true,
  establishment: {
    include: {
      owner: true,
      address: true,
    },
  },
  requiredRoles: {
    include: {
      role: true,
    },
  },
  subscriptions: {
    include: {
      user: true,
    },
  },
  _count: {
    select: {
      subscriptions: true,
      reviews: true,
    },
  },
} as const;

@Injectable()
export class ServiceOfferRepository extends BaseRepository<ServiceOffer> implements IServiceOfferRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'serviceOffer');
  }

  async findByEstablishment(establishmentSlug: string): Promise<ServiceOffer[]> {
    const establishment = await this.prisma.establishment.findUnique({
      where: { slug: establishmentSlug },
    });
    if (!establishment) {
      return [];
    }
    return this.prisma.serviceOffer.findMany({
      where: { establishmentId: establishment.id },
      include: {
        category: true,
        establishment: true,
        requiredRoles: {
          include: {
            role: true,
          },
        },
        _count: {
          select: {
            subscriptions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCategory(categorySlug: string): Promise<ServiceOffer[]> {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
    });
    if (!category) {
      return [];
    }
    return this.prisma.serviceOffer.findMany({
      where: { categoryId: category.id },
      include: {
        category: true,
        establishment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findWithRelations(slug: string): Promise<ServiceOffer | null> {
    return this.prisma.serviceOffer.findUnique({
      where: { slug },
      include: SERVICE_OFFER_RELATIONS,
    });
  }

  async findBySlug(slug: string): Promise<ServiceOffer | null> {
    return this.findWithRelations(slug);
  }
}
