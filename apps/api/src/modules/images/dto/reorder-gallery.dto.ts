import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsString, IsUrl } from 'class-validator';

export class ReorderGalleryDto {
  @ApiProperty({
    description:
      'Nova ordem da galeria: deve conter exatamente as mesmas URLs já existentes, sem duplicatas',
    type: [String],
    example: [
      'https://cdn.example.com/user/3f2b.../gallery/a.jpg',
      'https://cdn.example.com/user/3f2b.../gallery/b.png',
    ],
  })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  @IsUrl({ require_tld: false }, { each: true })
  urls: string[];
}
