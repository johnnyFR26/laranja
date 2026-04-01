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
import { EstablishmentService } from '../services/establishment.service';
import { CreateEstablishmentDto, UpdateEstablishmentDto, FilterEstablishmentDto } from '../dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('Establishments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar estabelecimento' })
  @ApiResponse({ status: 201, description: 'Estabelecimento criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Usuário já possui estabelecimento ou slug em uso' })
  create(@CurrentUser('id') userId: number, @Body() createDto: CreateEstablishmentDto) {
    return this.establishmentService.create(userId, createDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar estabelecimentos' })
  @ApiResponse({ status: 200, description: 'Lista de estabelecimentos' })
  findAll(@Query() filterDto: FilterEstablishmentDto) {
    return this.establishmentService.findAll(filterDto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obter meu estabelecimento' })
  @ApiResponse({ status: 200, description: 'Estabelecimento do usuário autenticado' })
  findMyEstablishment(@CurrentUser('id') userId: number) {
    return this.establishmentService.findByOwner(userId);
  }

  /** Segmento `:id` é o slug UUID público (não o id numérico interno do Prisma). */
  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Buscar estabelecimento por slug' })
  @ApiParam({ name: 'id', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, description: 'Estabelecimento encontrado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  findOne(@Param('id', ParseUUIDPipe) slug: string) {
    return this.establishmentService.findOne(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar estabelecimento' })
  @ApiParam({ name: 'id', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, description: 'Estabelecimento atualizado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  update(
    @Param('id', ParseUUIDPipe) slug: string,
    @Body() updateDto: UpdateEstablishmentDto,
  ) {
    return this.establishmentService.update(slug, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover estabelecimento' })
  @ApiParam({ name: 'id', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 204, description: 'Estabelecimento removido' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  remove(@Param('id', ParseUUIDPipe) slug: string) {
    return this.establishmentService.remove(slug);
  }
}
