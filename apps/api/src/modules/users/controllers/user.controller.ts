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
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles, Public } from '../../../common/decorators';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email já está em uso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
  findAll(@Query() filterDto: FilterUserDto) {
    return this.userService.findAll(filterDto);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Buscar usuário por slug' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.userService.findOne(slug);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  update(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(slug, updateUserDto);
  }

  @Delete(':slug')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover usuário' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) do usuário' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.userService.remove(slug);
  }
}
