import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterRoleDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search by name or slug' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by status (active/inactive)', example: true })
  @IsOptional()
  @Transform(({ value }) => (value === undefined || value === null ? undefined : value === 'true' || value === true))
  @IsBoolean()
  status?: boolean;
}
