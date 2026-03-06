/**
 * Endpoints de estabelecimentos (OpenAPI: /api/establishments/*).
 */

const ESTABLISHMENTS = '/establishments' as const

export const establishmentsEndpoints = {
  list: ESTABLISHMENTS,
  create: ESTABLISHMENTS,
  me: `${ESTABLISHMENTS}/me`,
  byId: (id: string) => `${ESTABLISHMENTS}/${id}` as const,
  bySlug: (slug: string) => `${ESTABLISHMENTS}/slug/${slug}` as const,
} as const
