import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ServiceOffer } from '../../../generated/client';
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
    const data: any = {
      title: createDto.title,
      description: createDto.description,
      establishmentId: createDto.establishmentId,
      categoryId: createDto.categoryId,
      budget: createDto.budget,
      budgetType: createDto.budgetType,
      deadline: createDto.deadline ? new Date(createDto.deadline) : undefined,
    };

    return this.serviceOfferRepository.create(data);
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
      where.establishmentId = establishmentId;
    }

    if (categoryId) {
      where.categoryId = categoryId;
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

  async findOne(id: string): Promise<ServiceOffer> {
    const serviceOffer = await this.serviceOfferRepository.findById(id);
    if (!serviceOffer) {
      throw new NotFoundException('Oferta de serviço não encontrada');
    }
    return serviceOffer;
  }

  async findByEstablishment(establishmentId: string): Promise<ServiceOffer[]> {
    return this.serviceOfferRepository.findByEstablishment(establishmentId);
  }

  async findByCategory(categoryId: string): Promise<ServiceOffer[]> {
    return this.serviceOfferRepository.findByCategory(categoryId);
  }

  async update(id: string, updateDto: UpdateServiceOfferDto): Promise<ServiceOffer> {
    await this.findOne(id);

    const data: any = { ...updateDto };
    if (updateDto.deadline) {
      data.deadline = new Date(updateDto.deadline);
    }

    return this.serviceOfferRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.serviceOfferRepository.delete(id);
  }

  async updateStatus(id: string, status: string): Promise<ServiceOffer> {
    await this.findOne(id);
    return this.serviceOfferRepository.update(id, { status } as any);
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
