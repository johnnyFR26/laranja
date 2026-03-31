import { IsString, IsOptional, IsEnum, IsUUID, IsNumber, IsDateString, Min, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BudgetType, ServiceOfferStatus } from '../../../generated/client';

export class CreateServiceOfferDto {
  @ApiProperty({ example: 'Desenvolvimento de Website' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Desenvolvimento completo de um website responsivo...' })
  @IsString()
  description: string;

  /** Slug UUID do estabelecimento (`establishments.slug`). */
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

  @ApiPropertyOptional({ enum: ServiceOfferStatus, default: ServiceOfferStatus.OPEN })
  @IsOptional()
  @IsEnum(ServiceOfferStatus)
  status?: ServiceOfferStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deadline?: string;

  /** Metadados extra (ex.: turno, uniforme) — coluna `controls` JSON no Prisma. */
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  controls?: Record<string, unknown>;
}
