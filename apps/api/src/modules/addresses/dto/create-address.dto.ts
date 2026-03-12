import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: 'Rua das Flores', description: 'Logradouro' })
  @IsNotEmpty({ message: 'Logradouro é obrigatório' })
  @IsString()
  @MaxLength(255)
  street!: string;

  @ApiPropertyOptional({ example: '123', description: 'Número' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  number?: string | null;

  @ApiPropertyOptional({ example: 'Apto 45', description: 'Complemento' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  complement?: string | null;

  @ApiPropertyOptional({ example: 'Centro', description: 'Bairro' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  neighborhood?: string | null;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  @IsString()
  @MaxLength(100)
  city!: string;

  @ApiProperty({ example: 'SP', description: 'Estado' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  @IsString()
  @MaxLength(2)
  state!: string;

  @ApiProperty({ example: '01310-100', description: 'CEP' })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @IsString()
  @MaxLength(20)
  zipCode!: string;

  @ApiPropertyOptional({ example: 'Brasil', description: 'País', default: 'Brasil' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;
}
