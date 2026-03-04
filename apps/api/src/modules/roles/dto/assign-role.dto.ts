import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({ 
    example: '550e8400-e29b-41d4-a716-446655440000', 
    description: 'User ID to assign roles to' 
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    example: ['550e8400-e29b-41d4-a716-446655440001'], 
    description: 'Array of Role IDs to assign',
    type: [String]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  roleIds: string[];
}

export class RemoveRoleDto {
  @ApiProperty({ 
    example: '550e8400-e29b-41d4-a716-446655440000', 
    description: 'User ID to remove roles from' 
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    example: ['550e8400-e29b-41d4-a716-446655440001'], 
    description: 'Array of Role IDs to remove',
    type: [String]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  roleIds: string[];
}
