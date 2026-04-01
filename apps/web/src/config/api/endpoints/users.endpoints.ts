/**
 * Endpoints de usuários (OpenAPI: /api/users/*).
 * Recurso identificado por slug UUID (não pelo id numérico interno).
 */

const USERS = '/users' as const

export const usersEndpoints = {
  list: USERS,
  create: USERS,
  bySlug: (slug: string) => `${USERS}/${slug}` as const,
} as const
