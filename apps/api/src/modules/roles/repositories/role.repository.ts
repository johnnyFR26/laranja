import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IRoleRepository } from '../contracts';
import { IPaginationParams, IPaginatedResult } from '../../../common/contracts/base-repository.interface';
import { CreateRoleDto } from '../dto';

@Injectable()
export class RoleRepository extends BaseRepository<Role> implements IRoleRepository {
  constructor(prisma: PrismaService) {
    super(prisma, 'role');
  }

  async createMany(roles: CreateRoleDto[]): Promise<Role[]> {
    const data = roles.map((r) => {
      const item: Record<string, unknown> = {
        name: r.name,
        description: r.description ?? null,
        status: r.status ?? true,
        ...(r.controls && { controls: r.controls }),
      };
      if (r.slug) item.slug = r.slug;
      return item;
    });
    const result = await this.prisma.role.createManyAndReturn({
      data,
      skipDuplicates: true,
    });
    return result;
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

  async findWithUsers(slug: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { slug },
      include: {
        userRoles: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getUserRoles(userSlug: string): Promise<Role[]> {
    const user = await this.prisma.user.findUnique({
      where: { slug: userSlug },
    });
    if (!user) {
      return [];
    }
    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId: user.id,
        role: { status: true },
      },
      include: { role: true },
    });
    return userRoles.map((ur) => ur.role);
  }

  async assignRolesToUser(userSlug: string, roleSlugs: string[]): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { slug: userSlug },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const roles = await this.prisma.role.findMany({
      where: { slug: { in: roleSlugs } },
    });
    const data = roles.map((role) => ({
      userId: user.id,
      roleId: role.id,
    }));

    await this.prisma.userRole.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async removeRolesFromUser(userSlug: string, roleSlugs: string[]): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { slug: userSlug },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const roles = await this.prisma.role.findMany({
      where: { slug: { in: roleSlugs } },
    });
    const roleIds = roles.map((r) => r.id);
    await this.prisma.userRole.deleteMany({
      where: {
        userId: user.id,
        roleId: { in: roleIds },
      },
    });
  }

  async removeAllRolesFromUser(userSlug: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { slug: userSlug },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.prisma.userRole.deleteMany({
      where: { userId: user.id },
    });
  }

  async setUserRoles(userSlug: string, roleSlugs: string[]): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { slug: userSlug },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({
        where: { userId: user.id },
      });

      if (roleSlugs.length > 0) {
        const roles = await tx.role.findMany({
          where: { slug: { in: roleSlugs } },
        });
        const data = roles.map((role) => ({
          userId: user.id,
          roleId: role.id,
        }));

        await tx.userRole.createMany({
          data,
        });
      }
    });
  }
}
