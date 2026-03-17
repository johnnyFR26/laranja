/**
 * Endpoints de endereços (OpenAPI: /api/addresses/*).
 */

const ADDRESSES = '/addresses' as const

export const addressesEndpoints = {
  list: ADDRESSES,
  create: ADDRESSES,
  byId: (id: string | number) => `${ADDRESSES}/${id}` as const,
} as const
