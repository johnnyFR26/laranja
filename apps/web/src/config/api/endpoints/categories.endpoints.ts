/**
 * Endpoints de categorias (OpenAPI: /api/categories/*).
 * Recurso identificado por slug UUID.
 */

const CATEGORIES = '/categories' as const

export const categoriesEndpoints = {
  list: CATEGORIES,
  create: CATEGORIES,
  bySlug: (slug: string) => `${CATEGORIES}/${slug}` as const,
} as const
