import { IsString, IsOptional, IsEnum, IsUUID, IsNumber, IsDateString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BudgetType, ServiceOfferStatus } from '../../../generated/client';

export class UpdateServiceOfferDto {
  @ApiPropertyOptional({ example: 'Desenvolvimento de Website' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Desenvolvimento completo de um website responsivo...' })
  @IsOptional()
  @IsString()
  description?: string;

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

  @ApiPropertyOptional({ enum: BudgetType })
  @IsOptional()
  @IsEnum(BudgetType)
  budgetType?: BudgetType;

  @ApiPropertyOptional({ enum: ServiceOfferStatus })
  @IsOptional()
  @IsEnum(ServiceOfferStatus)
  status?: ServiceOfferStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deadline?: string;
}
