import { Injectable } from '@nestjs/common';
import { Role } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IRoleRepository } from '../contracts';
import { IPaginationParams, IPaginatedResult } from '../../../common/contracts/base-repository.interface';

@Injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'role');
  }

  async findBySlug(slug: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { slug },
    });
  }

  async findByName(name: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { name },
    });
  }

  async findAllPaginated(
    params: IPaginationParams,
    where?: Record<string, unknown>,
  ): Promise<IPaginatedResult<Role>> {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.role.findMany({
        skip,
        take: limit,
        where: where as any,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.role.count({ where: where as any }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findWithUsers(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
    return userRoles.map((ur) => ur.role);
  }

  async assignRolesToUser(userId: string, roleIds: string[]): Promise<void> {
    const data = roleIds.map((roleId) => ({
      userId,
      roleId,
    }));

    await this.prisma.userRole.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async removeRolesFromUser(userId: string, roleIds: string[]): Promise<void> {
    await this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId: { in: roleIds },
      },
    });
  }

  async removeAllRolesFromUser(userId: string): Promise<void> {
    await this.prisma.userRole.deleteMany({
      where: { userId },
    });
  }

  async setUserRoles(userId: string, roleIds: string[]): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      // Remove all existing roles
      await tx.userRole.deleteMany({
        where: { userId },
      });

      // Assign new roles
      if (roleIds.length > 0) {
        const data = roleIds.map((roleId) => ({
          userId,
          roleId,
        }));

        await tx.userRole.createMany({
          data,
        });
      }
    });
  }
}
