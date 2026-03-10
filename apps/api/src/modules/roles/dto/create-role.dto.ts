import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Administrator', description: 'Role name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'admin', description: 'Role slug (unique identifier). Se omitido, gerado automaticamente a partir do name.' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-z0-9-_]+$/, { message: 'Slug must contain only lowercase letters, numbers, hyphens, and underscores' })
  slug?: string;

  @ApiPropertyOptional({ example: 'Full system access', description: 'Role description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the role is active', default: true })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({ description: 'Permissões/controles da role em formato JSON', example: { orders: ['create', 'read'] } })
  @IsOptional()
  @IsObject()
  controls?: Record<string, unknown>;
}
