import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class AssignRoleDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Slug (UUID) do usuário',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: ['550e8400-e29b-41d4-a716-446655440001'],
    description: 'Slugs (UUID) das roles a atribuir',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  roleIds: string[];
}

export class RemoveRoleDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Slug (UUID) do usuário',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: ['550e8400-e29b-41d4-a716-446655440001'],
    description: 'Slugs (UUID) das roles a remover',
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  roleIds: string[];
}
