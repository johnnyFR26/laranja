export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  name: string
  phone?: string | null
}

/** Usuário retornado em login/register/profile (snake_case conforme API) */
export interface AuthUserDto {
  id: string
  email: string
  name: string | null
  avatarUrl?: string | null
  phone?: string | null
  status?: string
  roles: string[]
}

/** Corpo da resposta de POST /auth/login e POST /auth/register */
export interface AuthTokensResponseDto {
  access_token: string
  refresh_token: string
  user: AuthUserDto
}

/** Corpo da resposta de GET /auth/profile */
export interface AuthProfileResponseDto {
  id: string
  email: string
  name: string | null
  phone: string | null
  avatarUrl: string | null
  status: string
  address: unknown
  roles: string[]
}

/** Corpo da resposta de POST /auth/refresh */
export interface AuthRefreshResponseDto {
  access_token: string
}

/** Resposta legada (camelCase); preferir AuthTokensResponseDto para nova API */
export interface AuthResponseDto {
  user: {
    id: string
    email: string
    name: string
    avatarUrl: string | null
  }
  accessToken?: string
  expiresAt?: string
}
