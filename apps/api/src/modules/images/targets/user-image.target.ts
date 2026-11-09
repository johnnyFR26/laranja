import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../generated/client';
import { PrismaService } from '../../../database/prisma.service';
import {
  ImageFieldsPatch,
  ImageTarget,
  ImageTargetRecord,
} from './image-target.interface';

const select = {
  id: true,
  slug: true,
  avatarUrl: true,
  mainImageUrl: true,
  imageUrls: true,
} satisfies Prisma.UserSelect;

type Row = Prisma.UserGetPayload<{ select: typeof select }>;

@Injectable()
export class UserImageTarget implements ImageTarget {
  readonly entity = 'user' as const;
  readonly profileField = 'avatarUrl' as const;
  readonly profileSlot = 'avatar' as const;

  constructor(private readonly prisma: PrismaService) {}

  async load(
    slug: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord> {
    const row = await (tx ?? this.prisma).user.findFirst({
      where: { slug, deletedAt: null },
      select,
    });
    if (!row) throw new NotFoundException('Usuário não encontrado');
    return this.toRecord(row);
  }

  async update(
    slug: string,
    data: ImageFieldsPatch,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageTargetRecord> {
    const { profileUrl, ...rest } = data;
    const row = await (tx ?? this.prisma).user.update({
      where: { slug },
      data: {
        ...rest,
        ...(profileUrl !== undefined && { avatarUrl: profileUrl }),
      },
      select,
    });
    return this.toRecord(row);
  }

  async collectUrls(slug: string): Promise<string[]> {
    const record = await this.load(slug);
    return [
      record.profileUrl,
      record.mainImageUrl,
      ...record.imageUrls,
    ].filter((u): u is string => !!u);
  }

  private toRecord(row: Row): ImageTargetRecord {
    return {
      id: row.id,
      slug: row.slug,
      ownerUserId: row.id,
      profileUrl: row.avatarUrl,
      mainImageUrl: row.mainImageUrl,
      imageUrls: row.imageUrls,
    };
  }
}
