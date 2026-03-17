import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Establishment } from '../../../generated/client';
import { EstablishmentRepository } from '../repositories/establishment.repository';
import { CreateEstablishmentDto, UpdateEstablishmentDto, FilterEstablishmentDto } from '../dto';
import { IPaginatedResult } from '../../../common/contracts/base-repository.interface';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class EstablishmentService {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(ownerId: number, createDto: CreateEstablishmentDto): Promise<Establishment> {
    // Check if owner already has an establishment
    console.log(ownerId);
    const existingByOwner = await this.establishmentRepository.findByOwner(ownerId);
    if (existingByOwner) {
      throw new ConflictException('Usuário já possui um estabelecimento');
    }

    return this.establishmentRepository.create({
      ...createDto,
      ownerId,
    } as any);
  }

  async findAll(filters: FilterEstablishmentDto): Promise<IPaginatedResult<Establishment>> {
    const { search, ...pagination } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.establishmentRepository.paginate({
      ...pagination,
      ...where,
    });
  }

  async findOne(id: number): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findWithServiceOffers(id);
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }
    return establishment;
  }

  async findBySlug(slug: string): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findBySlug(slug);
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }
    return establishment;
  }

  async findByOwner(ownerId: number): Promise<Establishment | null> {
    return this.establishmentRepository.findByOwner(ownerId);
  }

  async update(id: number, updateDto: UpdateEstablishmentDto): Promise<Establishment> {
    await this.findOne(id);

    if (updateDto.slug) {
      const existingBySlug = await this.establishmentRepository.findBySlug(updateDto.slug);
      if (existingBySlug && existingBySlug.id !== id) {
        throw new ConflictException('Slug já está em uso');
      }
    }

    return this.establishmentRepository.update(id, updateDto);
  }

    async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.establishmentRepository.delete(id);
  }
}
