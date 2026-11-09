import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ImageSetResponseDto {
  @ApiPropertyOptional({
    description: 'Avatar (apenas para usuários)',
    nullable: true,
    type: String,
  })
  avatarUrl?: string | null;

  @ApiPropertyOptional({
    description: 'Logo (apenas para estabelecimentos)',
    nullable: true,
    type: String,
  })
  logoUrl?: string | null;

  @ApiProperty({
    description: 'Imagem principal',
    nullable: true,
    type: String,
  })
  mainImageUrl: string | null;

  @ApiProperty({
    description: 'Galeria de imagens, em ordem',
    type: [String],
  })
  imageUrls: string[];
}
