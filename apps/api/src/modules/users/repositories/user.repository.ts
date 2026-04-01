import { Injectable } from '@nestjs/common';
import { User } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IUserRepository } from '../contracts/user-repository.interface';

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findWithRoles(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        address: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { slug },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        address: true,
      },
    });
  }
}
