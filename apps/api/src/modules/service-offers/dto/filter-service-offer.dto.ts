import { IsString, IsOptional, IsEnum, IsUUID, IsNumber, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BudgetType, ServiceOfferStatus } from '../../../generated/client';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterServiceOfferDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Slug (UUID) do estabelecimento' })
  @IsOptional()
  @IsUUID()
  establishmentId?: string;

  @ApiPropertyOptional({ description: 'Slug (UUID) da categoria' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ enum: ServiceOfferStatus })
  @IsOptional()
  @IsEnum(ServiceOfferStatus)
  status?: ServiceOfferStatus;

  @ApiPropertyOptional({ enum: BudgetType })
  @IsOptional()
  @IsEnum(BudgetType)
  budgetType?: BudgetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  minBudget?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  maxBudget?: number;
}
