import { Injectable } from '@nestjs/common';
import { ServiceOffer } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IServiceOfferRepository } from '../contracts/service-offer-repository.interface';

@Injectable()
export class ServiceOfferRepository extends BaseRepository<ServiceOffer> implements IServiceOfferRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'serviceOffer');
  }

  async findByEstablishment(establishmentId: string): Promise<ServiceOffer[]> {
    return this.prisma.serviceOffer.findMany({
      where: { establishmentId },
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

  async findByCategory(categoryId: string): Promise<ServiceOffer[]> {
    return this.prisma.serviceOffer.findMany({
      where: { categoryId },
      include: {
        category: true,
        establishment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findWithRelations(id: string): Promise<ServiceOffer | null> {
    return this.prisma.serviceOffer.findUnique({
      where: { id },
      include: {
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
      },
    });
  }

  // Override findById to include relations
  async findById(id: string): Promise<ServiceOffer | null> {
    return this.findWithRelations(id);
  }
}
