import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class CreateManyRolesDto {
  @ApiProperty({
    type: [CreateRoleDto],
    description: 'Array of roles to create',
    example: [
      { name: 'Administrator', slug: 'admin', description: 'Full system access' },
      { name: 'Editor', slug: 'editor', description: 'Can edit content' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one role is required' })
  @ValidateNested({ each: true })
  @Type(() => CreateRoleDto)
  roles: CreateRoleDto[];
}
