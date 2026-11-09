import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { memoryStorage } from 'multer';
import { CurrentUser, Public } from '../../../common/decorators';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ImageSetResponseDto, ImageUrlDto, ReorderGalleryDto } from '../dto';
import { MAX_GALLERY_SIZE, MAX_IMAGE_FILE_SIZE } from '../image.constants';
import { ImageFilePipe } from '../pipes/image-file.pipe';
import type { ValidatedImage } from '../pipes/image-file.pipe';
import type { ImageCurrentUser } from '../services/image-authorization.service';
import { ImagesService } from '../services/images.service';

const multerOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_FILE_SIZE,
    files: MAX_GALLERY_SIZE.user,
  },
};

const fileBody = {
  schema: {
    type: 'object',
    required: ['file'],
    properties: { file: { type: 'string', format: 'binary' } },
  },
};

@ApiTags('User Images')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiParam({ name: 'slug', description: 'Slug (UUID) do usuário' })
@Controller('users/:slug/images')
export class UserImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar imagens do usuário' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  list(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.imagesService.list('user', slug);
  }

  @Put('avatar')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @ApiOperation({ summary: 'Definir ou substituir o avatar' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Arquivo ausente' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 413, description: 'Arquivo maior que 5 MB' })
  @ApiResponse({ status: 415, description: 'Tipo de arquivo não suportado' })
  setAvatar(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFile(ImageFilePipe) file: ValidatedImage,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.setSingle('user', slug, 'avatar', file, user);
  }

  @Delete('avatar')
  @ApiOperation({ summary: 'Remover o avatar' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  removeAvatar(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.removeSingle('user', slug, 'avatar', user);
  }

  @Put('main')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileBody)
  @ApiOperation({ summary: 'Definir ou substituir a imagem principal' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Arquivo ausente' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 413, description: 'Arquivo maior que 5 MB' })
  @ApiResponse({ status: 415, description: 'Tipo de arquivo não suportado' })
  setMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFile(ImageFilePipe) file: ValidatedImage,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.setSingle('user', slug, 'main', file, user);
  }

  @Delete('main')
  @ApiOperation({ summary: 'Remover a imagem principal' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  removeMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.removeSingle('user', slug, 'main', user);
  }

  @Patch('main')
  @ApiOperation({ summary: 'Promover uma imagem da galeria a principal' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Imagem não está na galeria' })
  promoteToMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() dto: ImageUrlDto,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.promoteToMain('user', slug, dto.url, user);
  }

  // Rota literal declarada antes de qualquer rota parametrizada.
  @Put('gallery/order')
  @ApiOperation({ summary: 'Reordenar a galeria' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Ordem inválida' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  reorderGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() dto: ReorderGalleryDto,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.reorderGallery('user', slug, dto.urls, user);
  }

  @Post('gallery')
  @UseInterceptors(
    FilesInterceptor('files', MAX_GALLERY_SIZE.user, multerOptions),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files'],
      properties: {
        files: {
          type: 'array',
          maxItems: MAX_GALLERY_SIZE.user,
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiOperation({ summary: 'Adicionar imagens à galeria' })
  @ApiResponse({ status: 201, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Arquivos ausentes' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 413, description: 'Arquivo maior que 5 MB' })
  @ApiResponse({ status: 415, description: 'Tipo de arquivo não suportado' })
  @ApiResponse({ status: 422, description: 'Limite da galeria excedido' })
  addToGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFiles(ImageFilePipe) files: ValidatedImage[],
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.addToGallery('user', slug, files, user);
  }

  @Delete('gallery')
  @ApiBody({ type: ImageUrlDto, required: false })
  @ApiQuery({ name: 'url', required: false, description: 'URL da imagem' })
  @ApiOperation({
    summary: 'Remover imagem da galeria (url no corpo ou na query)',
  })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'URL ausente ou inválida' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Imagem não está na galeria' })
  removeFromGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() body: Partial<ImageUrlDto> | undefined,
    @Query('url') queryUrl: string | undefined,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    const dto = plainToInstance(ImageUrlDto, {
      url: body?.url ?? queryUrl,
    });
    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Informe uma URL válida no corpo ou na query (url)',
      );
    }
    return this.imagesService.removeFromGallery('user', slug, dto.url, user);
  }
}
