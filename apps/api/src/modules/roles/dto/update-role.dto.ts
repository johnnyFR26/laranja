import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({ example: 'Administrator', description: 'Role name' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ example: 'admin', description: 'Role slug (unique identifier)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-z0-9-_]+$/, { message: 'Slug must contain only lowercase letters, numbers, hyphens, and underscores' })
  slug?: string;

  @ApiPropertyOptional({ example: 'Full system access', description: 'Role description' })
  @IsOptional()
  @IsString()
  description?: string;
}
