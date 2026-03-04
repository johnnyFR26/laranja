import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Desenvolvimento Web' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'desenvolvimento-web' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'Categoria para serviços de desenvolvimento web' })
  @IsOptional()
  @IsString()
  description?: string;
}
