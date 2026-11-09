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
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ImageSetResponseDto, ImageUrlDto, ReorderGalleryDto } from '../dto';
import { MAX_GALLERY_SIZE, MAX_IMAGE_FILE_SIZE } from '../image.constants';
import { ImageFilePipe, ValidatedImage } from '../pipes/image-file.pipe';
import { ImageCurrentUser } from '../services/image-authorization.service';
import { ImagesService } from '../services/images.service';

const ENTITY = 'establishment' as const;
const MAX_FILES_PER_REQUEST = MAX_GALLERY_SIZE[ENTITY];

const multerOptions = {
  storage: memoryStorage(),
  limits: { fileSize: MAX_IMAGE_FILE_SIZE },
};

const singleFileBody = {
  schema: {
    type: 'object',
    required: ['file'],
    properties: { file: { type: 'string', format: 'binary' } },
  },
};

@ApiTags('Establishment Images')
@Controller('establishments/:slug/images')
export class EstablishmentImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Listar imagens do estabelecimento' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  list(@Param('slug', ParseUUIDPipe) slug: string) {
    return this.imagesService.list(ENTITY, slug);
  }

  @Put('logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody(singleFileBody)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiOperation({ summary: 'Definir ou substituir a logo' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  setLogo(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFile(ImageFilePipe) file: ValidatedImage,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.setSingle(ENTITY, slug, 'logo', file, user);
  }

  @Delete('logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover a logo' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  removeLogo(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.removeSingle(ENTITY, slug, 'logo', user);
  }

  @Put('main')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody(singleFileBody)
  @UseInterceptors(FileInterceptor('file', multerOptions))
  @ApiOperation({ summary: 'Definir ou substituir a imagem principal' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  setMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFile(ImageFilePipe) file: ValidatedImage,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.setSingle(ENTITY, slug, 'main', file, user);
  }

  @Delete('main')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover a imagem principal' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  removeMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.removeSingle(ENTITY, slug, 'main', user);
  }

  @Patch('main')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Promover imagem da galeria a principal' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada na galeria' })
  promoteMain(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() dto: ImageUrlDto,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.promoteToMain(ENTITY, slug, dto.url, user);
  }

  @Post('gallery')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files'],
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES_PER_REQUEST, multerOptions),
  )
  @ApiOperation({
    summary: `Adicionar imagens à galeria (máx. ${MAX_GALLERY_SIZE[ENTITY]})`,
  })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 201, type: ImageSetResponseDto })
  @ApiResponse({ status: 422, description: 'Limite da galeria excedido' })
  addToGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @UploadedFiles(ImageFilePipe) files: ValidatedImage[],
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.addToGallery(ENTITY, slug, files, user);
  }

  // Rota literal declarada antes de qualquer rota parametrizada em `gallery`.
  @Put('gallery/order')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reordenar a galeria' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 400, description: 'Ordem inválida' })
  reorderGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @Body() dto: ReorderGalleryDto,
    @CurrentUser() user: ImageCurrentUser,
  ) {
    return this.imagesService.reorderGallery(ENTITY, slug, dto.urls, user);
  }

  @Delete('gallery')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover imagem da galeria (url no corpo ou query)' })
  @ApiParam({ name: 'slug', description: 'Slug UUID público do estabelecimento' })
  @ApiQuery({ name: 'url', required: false })
  @ApiResponse({ status: 200, type: ImageSetResponseDto })
  @ApiResponse({ status: 404, description: 'Imagem não encontrada na galeria' })
  removeFromGallery(
    @Param('slug', ParseUUIDPipe) slug: string,
    @CurrentUser() user: ImageCurrentUser,
    @Body() body?: Partial<ImageUrlDto>,
    @Query('url') queryUrl?: string,
  ) {
    const url = body?.url ?? queryUrl;
    if (!url || typeof url !== 'string') {
      throw new BadRequestException('Informe a url da imagem (corpo ou query)');
    }
    return this.imagesService.removeFromGallery(ENTITY, slug, url, user);
  }
}
