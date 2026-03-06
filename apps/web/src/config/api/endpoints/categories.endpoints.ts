/**
 * Endpoints de categorias (OpenAPI: /api/categories/*).
 */

const CATEGORIES = '/categories' as const

export const categoriesEndpoints = {
  list: CATEGORIES,
  create: CATEGORIES,
  byId: (id: string) => `${CATEGORIES}/${id}` as const,
  bySlug: (slug: string) => `${CATEGORIES}/slug/${slug}` as const,
} as const
