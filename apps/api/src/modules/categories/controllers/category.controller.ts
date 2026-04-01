import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto, FilterCategoryDto } from '../dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 409, description: 'Slug já em uso' })
  create(@Body() createDto: CreateCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias' })
  findAll(@Query() filterDto: FilterCategoryDto) {
    return this.categoryService.findAll(filterDto);
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Buscar categoria por slug' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.categoryService.findOne(slug);
  }

  @Patch(':slug')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  update(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() updateDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(slug, updateDto);
  }

  @Delete(':slug')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover categoria' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da categoria' })
  @ApiResponse({ status: 204, description: 'Categoria removida' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  remove(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.categoryService.remove(slug);
  }
}
