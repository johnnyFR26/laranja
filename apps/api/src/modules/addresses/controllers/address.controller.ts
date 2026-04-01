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
import { AddressService } from '../services/address.service';
import { CreateAddressDto, UpdateAddressDto, FilterAddressDto } from '../dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles, Public } from '../../../common/decorators';

@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criar novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos os endereços' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso' })
  findAll(@Query() filterDto: FilterAddressDto) {
    return this.addressService.findAll(filterDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Buscar endereço por slug' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) do endereço' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  findOne(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.addressService.findOne(slug);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Atualizar endereço' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) do endereço' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  update(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(slug, updateAddressDto);
  }

  @Delete(':slug')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover endereço' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) do endereço' })
  @ApiResponse({ status: 204, description: 'Endereço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  remove(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.addressService.remove(slug);
  }
}
