/**
 * Endpoints de autenticação (OpenAPI: /api/auth/*).
 */

const AUTH = '/auth' as const

export const authEndpoints = {
  /** POST - Login (LoginDto) → 200 */
  login: `${AUTH}/login`,
  /** POST - Register (RegisterDto) → 201 */
  register: `${AUTH}/register`,
  /** POST - Refresh token → 200 */
  refresh: `${AUTH}/refresh`,
  /** GET - Perfil (Bearer) → 200 */
  profile: `${AUTH}/profile`,
  /** POST - Validar token (Bearer) → 200 */
  validate: `${AUTH}/validate`,
} as const
