import { Injectable } from '@nestjs/common';
import { Establishment } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

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

  async findWithServiceOffers(id: number): Promise<Establishment | null> {
    return this.prisma.establishment.findUnique({
      where: { id },
      include: {
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
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  // Override findById to include relations
  async findById(id: number): Promise<Establishment | null> {
    return this.prisma.establishment.findUnique({
      where: { id },
      include: {
        owner: true,
        address: true,
      },
    });
  }
}
