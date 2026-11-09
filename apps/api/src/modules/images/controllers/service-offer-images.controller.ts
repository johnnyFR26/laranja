import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser, Public } from '../../../common/decorators';
import {
  ImageSetResponseDto,
  ImageUrlDto,
  ReorderGalleryDto,
} from '../dto';
import {
  ImageEntityType,
  MAX_GALLERY_SIZE,
  MAX_IMAGE_FILE_SIZE,
} from '../image.constants';
import { ImageFilePipe, ValidatedImage } from '../pipes/image-file.pipe';
import { ImageCurrentUser } from '../services/image-authorization.service';
import { ImagesService } from '../services/images.service';

const ENTITY: ImageEntityType = 'service-offer';
const GALLERY_MAX_FILES = MAX_GALLERY_SIZE[ENTITY];

const multerOptions = {
  storage: memoryStorage(),
  limits: { fileSize: MAX_IMAGE_FILE_SIZE, files: GALLERY_MAX_FILES },
};

const singleFileBody = {
  schema: {
    type: 'object',
    required: ['file'],
    properties: { file: { type: 'string', format: 'binary' } },
  },
};

const galleryFilesBody = {
  schema: {
    type: 'object',
    required: ['files'],
    properties: {
      files: {
        type: 'array',
        maxItems: GALLERY_MAX_FILES,
        items: { type: 'string', format: 'binary' },
      },
    },
  },
};

@ApiTags('Service Offer Images')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service-offers/:slug/images')
export class ServiceOfferImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar imagens da oferta de serviço' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 404, description: 'Oferta de serviço não encontrada' })
  list(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.imagesService.list(ENTITY, slug);
  }

  @Put('main')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody(singleFileBody)
  @ApiOperation({ summary: 'Definir/substituir a imagem principal' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
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
    return this.imagesService.setSingle(ENTITY, slug, 'main', file, user);
  }

  @Delete('main')
  @ApiOperation({ summary: 'Remover a imagem principal' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  removeMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.removeSingle(ENTITY, slug, 'main', user);
  }

  @Patch('main')
  @ApiOperation({ summary: 'Promover imagem da galeria a principal' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada na galeria' })
  promoteToMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() dto: ImageUrlDto,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.promoteToMain(ENTITY, slug, dto.url, user);
  }

  // Rota literal declarada antes de qualquer rota parametrizada.
  @Put('gallery/order')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reordenar a galeria' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Ordem não corresponde à galeria' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  reorderGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() dto: ReorderGalleryDto,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.reorderGallery(ENTITY, slug, dto.urls, user);
  }

  @Post('gallery')
  @UseInterceptors(FilesInterceptor('files', GALLERY_MAX_FILES, multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody(galleryFilesBody)
  @ApiOperation({ summary: 'Adicionar imagens à galeria (máx. 10)' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
  @ApiResponse({ status: 201, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Arquivos ausentes' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 413, description: 'Arquivo maior que 5 MB' })
  @ApiResponse({ status: 415, description: 'Tipo de arquivo não suportado' })
  @ApiResponse({ status: 422, description: 'Galeria excede o limite' })
  addToGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFiles(ImageFilePipe) files: ValidatedImage[],
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.addToGallery(ENTITY, slug, files, user);
  }

  @Delete('gallery')
  @ApiOperation({ summary: 'Remover imagem da galeria' })
  @ApiParam({ name: 'slug', description: 'Slug (UUID) da oferta de serviço' })
  @ApiQuery({
    name: 'url',
    required: false,
    description: 'Alternativa ao corpo { url } para clientes que descartam o body do DELETE',
  })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada na galeria' })
  removeFromGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
    @Body() body?: Partial<ImageUrlDto>,
    @Query('url') queryUrl?: string,
  ) {
    const url = body?.url ?? queryUrl;
    if (!url || typeof url !== 'string') {
      throw new BadRequestException('Informe a URL da imagem (corpo ou query "url")');
    }
    return this.imagesService.removeFromGallery(ENTITY, slug, url, user);
  }
}
