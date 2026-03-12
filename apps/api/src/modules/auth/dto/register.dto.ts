import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsArray,
  IsUUID,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RegisterControlsDto {
  @ApiPropertyOptional({ type: [String], description: 'Skills do freelancer' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @ApiPropertyOptional({
    description: 'Disponibilidade: { morning: Record<dia, boolean>, evening: Record<dia, boolean> }',
  })
  @IsOptional()
  @IsObject()
  availability?: Record<string, Record<string, boolean>>;
}

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  password: string;

  @ApiProperty({ example: 'João Silva' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '+55 11 99999-9999' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'IDs das roles selecionadas (aceita número ou string)',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  @Transform(({ value }: { value: unknown }) =>
    Array.isArray(value) ? value.map((id) => String(id)) : value
  )
  roleIds?: string[];

  @ApiPropertyOptional({ type: RegisterControlsDto, description: 'Skills e disponibilidade' })
  @IsOptional()
  @ValidateNested()
  @Type(() => RegisterControlsDto)
  controls?: RegisterControlsDto;
}
