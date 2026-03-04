import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com', description: 'Email do usuário' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(255)
  email!: string;

  @ApiProperty({ example: 'John Doe', description: 'Nome completo do usuário' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString()
  @MaxLength(255)
  name!: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    { message: 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial' }
  )
  password!: string;

  @ApiPropertyOptional({ example: '+5511999999999', description: 'Telefone do usuário' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg', description: 'URL do avatar' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ description: 'ID do endereço do usuário' })
  @IsOptional()
  @IsUUID()
  addressId?: string;

  @ApiPropertyOptional({ 
    description: 'IDs das roles a serem atribuídas ao usuário',
    type: [String],
    example: ['uuid-role-1', 'uuid-role-2']
  })
  @IsOptional()
  @IsUUID('4', { each: true })
  roleIds?: string[];
}
