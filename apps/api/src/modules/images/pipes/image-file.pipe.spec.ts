import {
  BadRequestException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ImageFilePipe, ValidatedImage } from './image-file.pipe';

const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00]);
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0]);
const webp = Buffer.concat([
  Buffer.from('RIFF'),
  Buffer.from([1, 2, 3, 4]),
  Buffer.from('WEBPVP8 '),
]);

const file = (buffer: Buffer, mimetype: string) => ({
  buffer,
  mimetype,
  size: buffer.length,
});

describe('ImageFilePipe', () => {
  const pipe = new ImageFilePipe();

  it.each([
    [jpeg, 'image/jpeg', 'jpg'],
    [png, 'image/png', 'png'],
    [webp, 'image/webp', 'webp'],
  ])('aceita arquivo válido %#', (buf, mime, ext) => {
    const result = pipe.transform(file(buf, mime)) as ValidatedImage;
    expect(result).toEqual({
      buffer: buf,
      mimeType: mime,
      ext,
      size: buf.length,
    });
  });

  it('lança 400 sem arquivo', () => {
    expect(() => pipe.transform(undefined)).toThrow(BadRequestException);
    expect(() => pipe.transform([])).toThrow(BadRequestException);
  });

  it('lança 415 para MIME fora da lista', () => {
    expect(() => pipe.transform(file(jpeg, 'image/gif'))).toThrow(
      UnsupportedMediaTypeException,
    );
  });

  it('lança 415 quando magic bytes divergem do MIME', () => {
    expect(() => pipe.transform(file(png, 'image/jpeg'))).toThrow(
      UnsupportedMediaTypeException,
    );
    expect(() =>
      pipe.transform(file(Buffer.from('RIFF....WAVE'), 'image/webp')),
    ).toThrow(UnsupportedMediaTypeException);
  });

  it('valida array e falha se algum item for inválido', () => {
    const ok = pipe.transform([
      file(jpeg, 'image/jpeg'),
      file(png, 'image/png'),
    ]) as ValidatedImage[];
    expect(ok.map((f) => f.ext)).toEqual(['jpg', 'png']);
    expect(() =>
      pipe.transform([file(jpeg, 'image/jpeg'), file(jpeg, 'image/png')]),
    ).toThrow(UnsupportedMediaTypeException);
  });
});
