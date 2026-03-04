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

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findWithServiceOffers(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async findBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findBySlug(slug);
    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return category;
  }

  async update(id: string, updateDto: UpdateCategoryDto): Promise<Category> {
    await this.findOne(id);

    if (updateDto.slug) {
      const existingBySlug = await this.categoryRepository.findBySlug(updateDto.slug);
      if (existingBySlug && existingBySlug.id !== id) {
        throw new ConflictException('Categoria com este slug já existe');
      }
    }

    return this.categoryRepository.update(id, updateDto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.categoryRepository.delete(id);
  }
}
