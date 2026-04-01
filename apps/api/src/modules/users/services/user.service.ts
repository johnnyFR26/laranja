import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from '../../../generated/client';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dto';
import { IPaginatedResult } from '../../../common/contracts/base-repository.interface';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { email, password, roleIds, ...userData } = createUserDto;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    let rolesForAssign: { id: number }[] = [];
    if (roleIds && roleIds.length > 0) {
      rolesForAssign = await this.prisma.role.findMany({
        where: { slug: { in: roleIds } },
      });
      if (rolesForAssign.length !== roleIds.length) {
        throw new BadRequestException('Uma ou mais roles não foram encontradas');
      }
    }

    const hashedPassword = await argon2.hash(password);

    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          ...userData,
        } as any,
      });

      if (rolesForAssign.length > 0) {
        await tx.userRole.createMany({
          data: rolesForAssign.map((role) => ({
            userId: newUser.id,
            roleId: role.id,
          })),
        });
      }

      return newUser;
    });

    const userObj = user as any;
    const { password: _pwd, ...userWithoutPassword } = userObj;
    return userWithoutPassword;
  }

  async findAll(filters: FilterUserDto): Promise<IPaginatedResult<User>> {
    const { search, status, ...pagination } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    return this.userRepository.paginate({
      ...pagination,
      ...where,
    });
  }

  async findOne(slug: string): Promise<User> {
    const user = await this.userRepository.findBySlug(slug);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async update(slug: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(slug);
    return this.userRepository.update(slug, updateUserDto);
  }

  async remove(slug: string): Promise<void> {
    await this.findOne(slug);
    await this.userRepository.delete(slug);
  }
}
