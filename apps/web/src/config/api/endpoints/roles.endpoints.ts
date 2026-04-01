/**
 * Endpoints de roles (OpenAPI: /api/roles/*).
 * Recurso identificado por slug UUID. `user/:userId` usa o slug UUID do usuário.
 */

const ROLES = '/roles' as const

export const rolesEndpoints = {
  list: ROLES,
  create: ROLES,
  bySlug: (slug: string) => `${ROLES}/${slug}` as const,
  user: (userSlug: string) => `${ROLES}/user/${userSlug}` as const,
  userSet: (userSlug: string) => `${ROLES}/user/${userSlug}/set` as const,
  assign: `${ROLES}/assign`,
  remove: `${ROLES}/remove`,
} as const
