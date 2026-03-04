import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Administrator', description: 'Role name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'admin', description: 'Role slug (unique identifier)' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-z0-9-_]+$/, { message: 'Slug must contain only lowercase letters, numbers, hyphens, and underscores' })
  slug: string;

  @ApiPropertyOptional({ example: 'Full system access', description: 'Role description' })
  @IsOptional()
  @IsString()
  description?: string;
}
