import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/client';
import { BudgetType, ServiceOffer, ServiceOfferStatus } from '../../../generated/client';
import { ServiceOfferRepository } from '../repositories/service-offer.repository';
import { CreateServiceOfferDto, UpdateServiceOfferDto, FilterServiceOfferDto } from '../dto';
import { IPaginatedResult } from '../../../common/contracts/base-repository.interface';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class ServiceOfferService {
  constructor(
    private readonly serviceOfferRepository: ServiceOfferRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(createDto: CreateServiceOfferDto): Promise<ServiceOffer> {
    const establishment = await this.prisma.establishment.findUnique({
      where: { slug: createDto.establishmentId },
    });
    if (!establishment) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    let categoryId: number | null = null;
    if (createDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { slug: createDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Categoria não encontrada');
      }
      categoryId = category.id;
    }

    const data: Prisma.ServiceOfferCreateInput = {
      title: createDto.title,
      description: createDto.description,
      establishment: { connect: { id: establishment.id } },
      budget: createDto.budget,
      budgetType: createDto.budgetType ?? BudgetType.FIXED,
      status: createDto.status ?? ServiceOfferStatus.OPEN,
      deadline: createDto.deadline ? new Date(createDto.deadline) : undefined,
      ...(categoryId != null ? { category: { connect: { id: categoryId } } } : {}),
      ...(createDto.controls != null
        ? { controls: createDto.controls as Prisma.InputJsonValue }
        : {}),
    };

    return this.prisma.serviceOffer.create({ data });
  }

  async findAll(filters: FilterServiceOfferDto): Promise<IPaginatedResult<ServiceOffer>> {
    const { search, establishmentId, categoryId, status, budgetType, minBudget, maxBudget, ...pagination } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (establishmentId) {
      where.establishment = { slug: establishmentId };
    }

    if (categoryId) {
      where.category = { slug: categoryId };
    }

    if (status) {
      where.status = status;
    }

    if (budgetType) {
      where.budgetType = budgetType;
    }

    if (minBudget !== undefined || maxBudget !== undefined) {
      where.budget = {};
      if (minBudget !== undefined) {
        where.budget.gte = minBudget;
      }
      if (maxBudget !== undefined) {
        where.budget.lte = maxBudget;
      }
    }

    return this.serviceOfferRepository.paginate({
      ...pagination,
      ...where,
    });
  }

  async findOne(slug: string): Promise<ServiceOffer> {
    const serviceOffer = await this.serviceOfferRepository.findBySlug(slug);
    if (!serviceOffer) {
      throw new NotFoundException('Oferta de serviço não encontrada');
    }
    return serviceOffer;
  }

  async findByEstablishment(establishmentSlug: string): Promise<ServiceOffer[]> {
    return this.serviceOfferRepository.findByEstablishment(establishmentSlug);
  }

  async findByCategory(categorySlug: string): Promise<ServiceOffer[]> {
    return this.serviceOfferRepository.findByCategory(categorySlug);
  }

  async update(slug: string, updateDto: UpdateServiceOfferDto): Promise<ServiceOffer> {
    await this.findOne(slug);

    const data: any = { ...updateDto };
    if (updateDto.deadline) {
      data.deadline = new Date(updateDto.deadline);
    }

    return this.serviceOfferRepository.update(slug, data);
  }

  async remove(slug: string): Promise<void> {
    await this.findOne(slug);
    await this.serviceOfferRepository.delete(slug);
  }

  async updateStatus(slug: string, status: string): Promise<ServiceOffer> {
    await this.findOne(slug);
    return this.serviceOfferRepository.update(slug, { status } as any);
  }

  async findOpenOffers(): Promise<ServiceOffer[]> {
    return this.prisma.serviceOffer.findMany({
      where: { status: 'OPEN' },
      include: {
        category: true,
        establishment: {
          include: {
            owner: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
