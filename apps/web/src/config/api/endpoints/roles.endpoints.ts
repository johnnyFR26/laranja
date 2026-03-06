/**
 * Endpoints de roles (OpenAPI: /api/roles/*).
 */

const ROLES = '/roles' as const

export const rolesEndpoints = {
  list: ROLES,
  create: ROLES,
  byId: (id: string) => `${ROLES}/${id}` as const,
  bySlug: (slug: string) => `${ROLES}/slug/${slug}` as const,
  user: (userId: string) => `${ROLES}/user/${userId}` as const,
  userSet: (userId: string) => `${ROLES}/user/${userId}/set` as const,
  assign: `${ROLES}/assign`,
  remove: `${ROLES}/remove`,
} as const
