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

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Buscar oferta por ID' })
  @ApiParam({ name: 'id', description: 'ID da oferta' })
  @ApiResponse({ status: 200, description: 'Oferta encontrada' })
  @ApiResponse({ status: 404, description: 'Oferta não encontrada' })
  findOne(@Param('id') id: string) {
    return this.serviceOfferService.findOne(id);
  }

  @Get('establishment/:establishmentId')
  @Public()
  @ApiOperation({ summary: 'Listar ofertas por estabelecimento' })
  @ApiParam({ name: 'establishmentId', description: 'ID do estabelecimento' })
  findByEstablishment(@Param('establishmentId') establishmentId: string) {
    return this.serviceOfferService.findByEstablishment(establishmentId);
  }

  @Get('category/:categoryId')
  @Public()
  @ApiOperation({ summary: 'Listar ofertas por categoria' })
  @ApiParam({ name: 'categoryId', description: 'ID da categoria' })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.serviceOfferService.findByCategory(categoryId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar oferta' })
  @ApiParam({ name: 'id', description: 'ID da oferta' })
  @ApiResponse({ status: 200, description: 'Oferta atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Oferta não encontrada' })
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceOfferDto) {
    return this.serviceOfferService.update(id, updateDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Atualizar status da oferta' })
  @ApiParam({ name: 'id', description: 'ID da oferta' })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.serviceOfferService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover oferta' })
  @ApiParam({ name: 'id', description: 'ID da oferta' })
  @ApiResponse({ status: 204, description: 'Oferta removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Oferta não encontrada' })
  remove(@Param('id') id: string) {
    return this.serviceOfferService.remove(id);
  }
}
