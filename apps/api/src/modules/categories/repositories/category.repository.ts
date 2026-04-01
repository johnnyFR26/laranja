import { Injectable } from '@nestjs/common';
import { Category } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(prisma: PrismaService) {
    super(prisma, 'category');
  }

  async findWithServiceOffers(slug: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        serviceOffers: {
          where: { status: 'OPEN' },
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            serviceOffers: true,
          },
        },
      },
    });
  }
}
