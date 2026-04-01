import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Category } from '../../../generated/client';
import { CategoryRepository } from '../repositories/category.repository';
import { CreateCategoryDto, UpdateCategoryDto, FilterCategoryDto } from '../dto';
import { IPaginatedResult } from '../../../common/contracts/base-repository.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createDto: CreateCategoryDto): Promise<Category> {
    const existingBySlug = await this.categoryRepository.findBySlug(createDto.slug);
    if (existingBySlug) {
      throw new ConflictException('Categoria com este slug já existe');
    }

    return this.categoryRepository.create(createDto);
  }

  async findAll(filters: FilterCategoryDto): Promise<IPaginatedResult<Category>> {
    const { search, ...pagination } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.categoryRepository.paginate({
      ...pagination,
      ...where,
    });
  }

  async findOne(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findWithServiceOffers(slug);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async update(slug: string, updateDto: UpdateCategoryDto): Promise<Category> {
    await this.findOne(slug);

    if (updateDto.slug) {
      const existingBySlug = await this.categoryRepository.findBySlug(updateDto.slug);
      if (existingBySlug && existingBySlug.slug !== slug) {
        throw new ConflictException('Categoria com este slug já existe');
      }
    }

    return this.categoryRepository.update(slug, updateDto);
  }

  async remove(slug: string): Promise<void> {
    await this.findOne(slug);
    await this.categoryRepository.delete(slug);
  }
}
