export type ImageEntityType = 'user' | 'establishment' | 'service-offer';
export type ImageSlot = 'avatar' | 'logo' | 'main' | 'gallery';

export const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp'] as const;
export type AllowedImageMime = (typeof ALLOWED_IMAGE_MIME)[number];

/** Tamanho máximo por arquivo: 5 MB. */
export const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;

/** Número máximo de imagens na galeria por entidade. */
export const MAX_GALLERY_SIZE: Record<ImageEntityType, number> = {
  user: 10,
  establishment: 20,
  'service-offer': 10,
};

/** Extensão derivada do MIME detectado (nunca do nome enviado). */
export const IMAGE_EXTENSION: Record<AllowedImageMime, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
