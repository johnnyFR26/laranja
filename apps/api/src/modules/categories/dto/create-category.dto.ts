import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Desenvolvimento Web' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'desenvolvimento-web' })
  @IsString()
  slug: string;

  @ApiPropertyOptional({ example: 'Categoria para serviços de desenvolvimento web' })
  @IsOptional()
  @IsString()
  description?: string;
}
