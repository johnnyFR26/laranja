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
import { ServiceOfferService } from '../services/service-offer.service';
import { CreateServiceOfferDto, UpdateServiceOfferDto, FilterServiceOfferDto } from '../dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Public } from '../../../common/decorators/public.decorator';

@ApiTags('Service Offers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service-offers')
export class ServiceOfferController {
  constructor(private readonly serviceOfferService: ServiceOfferService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova oferta de serviço' })
  @ApiResponse({ status: 201, description: 'Oferta criada com sucesso' })
  create(@Body() createDto: CreateServiceOfferDto) {
    return this.serviceOfferService.create(createDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar ofertas de serviço' })
  @ApiResponse({ status: 200, description: 'Lista de ofertas retornada com sucesso' })
  findAll(@Query() filterDto: FilterServiceOfferDto) {
    return this.serviceOfferService.findAll(filterDto);
  }

  @Get('open')
  @Public()
  @ApiOperation({ summary: 'Listar ofertas abertas' })
  @ApiResponse({ status: 200, description: 'Lista de ofertas abertas' })
  findOpen() {
    return this.serviceOfferService.findOpenOffers();
  }

  @Get('establishment/:establishmentSlug')
  @Public()
  @ApiOperation({ summary: 'Listar ofertas por estabelecimento' })
  @ApiParam({ name: 'establishmentSlug', description: 'Slug (UUID) do estabelecimento' })
  findByEstablishment(@Param('establishmentSlug', ParseUUIDPipe) establishmentSlug: string) {
    return this.serviceOfferService.findByEstablishment(establishmentSlug);
  }

  @Get('category/:categorySlug')
  @Public()
  @ApiOperation({ summary: 'Listar ofertas por categoria' })
  @ApiParam({ name: 'categorySlug', description: 'Slug (UUID) da categoria' })
  findByCategory(@Param('categorySlug', ParseUUIDPipe) categorySlug: string) {
    return this.serviceOfferService.findByCategory(categorySlug);
  }

  @Get(':slug')
  @Public()
  @ApiOperation({ summary: 'Buscar oferta por slug' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta' })
  @ApiResponse({ status: 200, description: 'Oferta encontrada' })
  @ApiResponse({ status: 404, description: 'Oferta não encontrada' })
  findOne(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.serviceOfferService.findOne(slug);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Atualizar oferta' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta' })
  @ApiResponse({ status: 200, description: 'Oferta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Oferta não encontrada' })
  update(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() updateDto: UpdateServiceOfferDto,
  ) {
    return this.serviceOfferService.update(slug, updateDto);
  }

  @Patch(':slug/status')
  @ApiOperation({ summary: 'Atualizar status da oferta' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta' })
  updateStatus(@Param('slug', ParseUUIDPipe) slug: string, @Body('status') status: string) {
    return this.serviceOfferService.updateStatus(slug, status);
  }

  @Delete(':slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover oferta' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta' })
  @ApiResponse({ status: 204, description: 'Oferta removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Oferta não encontrada' })
  remove(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.serviceOfferService.remove(slug);
  }
}
