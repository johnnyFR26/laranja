import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ImageUrlDto {
  @ApiProperty({
    description: 'URL completa (CDN) da imagem',
    example: 'https://cdn.example.com/user/3f2b.../gallery/9a1c....jpg',
  })
  @IsString()
  @IsUrl({ require_tld: false })
  url: string;
}
