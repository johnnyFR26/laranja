/**
 * Endpoints de estabelecimentos (OpenAPI: /api/establishments/*).
 * Recurso identificado por slug UUID.
 */

const ESTABLISHMENTS = '/establishments' as const

export const establishmentsEndpoints = {
  list: ESTABLISHMENTS,
  create: ESTABLISHMENTS,
  me: `${ESTABLISHMENTS}/me`,
  bySlug: (slug: string) => `${ESTABLISHMENTS}/${slug}` as const,
} as const
