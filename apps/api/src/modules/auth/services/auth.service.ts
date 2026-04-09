import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../../../database/prisma.service';
import { LoginDto, RegisterDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Usuário inativo');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.userRoles.map((ur: any) => ur.role.slug),
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
      user: {
        id: String(user.id),
        slug: user.slug,
        email: user.email,
        name: user.name,
        roles: user.userRoles.map((ur: any) => ur.role.slug),
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await argon2.hash(registerDto.password);

    const controls = registerDto.controls
      ? ({ skills: registerDto.controls.skills, availability: registerDto.controls.availability } as object)
      : undefined;

    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          name: registerDto.name,
          phone: registerDto.phone,
          password: hashedPassword,
          controls: controls ?? undefined,
        },
      });

      if (registerDto.roleIds?.length) {
        const roleIds = registerDto.roleIds.map((id) => parseInt(String(id), 10)).filter((n) => !Number.isNaN(n));
        if (roleIds.length) {
          const roles = await tx.role.findMany({ where: { id: { in: roleIds } } });
          if (roles.length) {
            await tx.userRole.createMany({
              data: roles.map((r) => ({ userId: newUser.id, roleId: r.id })),
              skipDuplicates: true,
            });
          }
        }
      }

      return newUser;
    });

    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: { userRoles: { include: { role: true } } },
    });

    const roles = userWithRoles?.userRoles.map((ur) => ur.role.slug) ?? [];
    const payload = {
      sub: user.id,
      email: user.email,
      roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
      user: {
        id: String(user.id),
        slug: user.slug,
        email: user.email,
        name: user.name,
        roles,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const newPayload = {
        sub: payload.sub,
        email: payload.email,
        roles: payload.roles,
      };

      return {
        access_token: this.jwtService.sign(newPayload),
      };
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        address: true,
        establishment: {
          include: {
            address: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      id: String(user.id),
      slug: user.slug,
      email: user.email,
      name: user.name,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      status: user.status,
      address: user.address,
      controls: user.controls as { skills?: string[]; availability?: Record<string, unknown> } | null,
      roles: user.userRoles.map((ur) => ur.role.slug),
      establishment: user.establishment ? user.establishment : null,
    };
  }
}
