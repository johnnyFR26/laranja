/**
 * Endpoints de usuários (OpenAPI: /api/users/*).
 */

const USERS = '/users' as const

export const usersEndpoints = {
  list: USERS,
  create: USERS,
  byId: (id: string) => `${USERS}/${id}` as const,
} as const
