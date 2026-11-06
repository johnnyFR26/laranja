import {
  BadRequestException,
  Injectable,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import {
  ALLOWED_IMAGE_MIME,
  AllowedImageMime,
  IMAGE_EXTENSION,
} from '../image.constants';

export interface ValidatedImage {
  buffer: Buffer;
  mimeType: AllowedImageMime;
  ext: string;
  size: number;
}

type UploadedImage = Pick<Express.Multer.File, 'buffer' | 'mimetype' | 'size'>;

const startsWith = (buf: Buffer, bytes: number[], offset = 0): boolean =>
  buf.length >= offset + bytes.length &&
  bytes.every((b, i) => buf[offset + i] === b);

const SIGNATURES: Record<AllowedImageMime, (buf: Buffer) => boolean> = {
  'image/jpeg': (buf) => startsWith(buf, [0xff, 0xd8, 0xff]),
  'image/png': (buf) =>
    startsWith(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  // "RIFF" + 4 bytes de tamanho + "WEBP"
  'image/webp': (buf) =>
    startsWith(buf, [0x52, 0x49, 0x46, 0x46]) &&
    startsWith(buf, [0x57, 0x45, 0x42, 0x50], 8),
};

@Injectable()
export class ImageFilePipe
  implements
    PipeTransform<
      UploadedImage | UploadedImage[] | undefined,
      ValidatedImage | ValidatedImage[]
    >
{
  transform(
    value: UploadedImage | UploadedImage[] | undefined,
  ): ValidatedImage | ValidatedImage[] {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        throw new BadRequestException('Nenhum arquivo enviado');
      }
      return value.map((file) => this.validate(file));
    }
    return this.validate(value);
  }

  private validate(file: UploadedImage | undefined): ValidatedImage {
    if (!file || !file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const accepted = ALLOWED_IMAGE_MIME.join(', ');
    const declared = file.mimetype as AllowedImageMime;
    if (!ALLOWED_IMAGE_MIME.includes(declared)) {
      throw new UnsupportedMediaTypeException(
        `Tipo de arquivo não suportado. Tipos aceitos: ${accepted}`,
      );
    }

    if (!SIGNATURES[declared](file.buffer)) {
      throw new UnsupportedMediaTypeException(
        `O conteúdo do arquivo não corresponde ao tipo declarado. Tipos aceitos: ${accepted}`,
      );
    }

    return {
      buffer: file.buffer,
      mimeType: declared,
      ext: IMAGE_EXTENSION[declared],
      size: file.size ?? file.buffer.length,
    };
  }
}
