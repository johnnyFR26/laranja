import { IsString, IsOptional, IsEnum, IsUUID, IsNumber, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BudgetType } from '../../../generated/client';

export class CreateServiceOfferDto {
  @ApiProperty({ example: 'Desenvolvimento de Website' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Desenvolvimento completo de um website responsivo...' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsUUID()
  establishmentId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ example: 5000.00 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  budget?: number;

  @ApiPropertyOptional({ enum: BudgetType, default: BudgetType.FIXED })
  @IsOptional()
  @IsEnum(BudgetType)
  budgetType?: BudgetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deadline?: string;
}
