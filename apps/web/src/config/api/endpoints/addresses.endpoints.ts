/**
 * Endpoints de endereços (OpenAPI: /api/addresses/*).
 * Recurso identificado por slug UUID.
 */

const ADDRESSES = '/addresses' as const

export const addressesEndpoints = {
  list: ADDRESSES,
  create: ADDRESSES,
  bySlug: (slug: string) => `${ADDRESSES}/${slug}` as const,
} as const
