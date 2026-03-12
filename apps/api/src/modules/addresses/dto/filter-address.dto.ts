import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FilterAddressDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Busca por cidade, bairro, logradouro ou CEP' })
  @IsOptional()
  @IsString()
  search?: string;
}
