import type { AddressDto } from "./address.dto.js"
import { EstablishmentDto } from "./establishment.dto.js"
import { UserRoleDto } from "./user-role.dto.js"

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  name: string
  phone?: string | null
  /** IDs das roles (vindos do backend) */
  roleIds: string[]
  /** Disponibilidade e skills do freelancer */
  controls: {
    skills?: string[];
    availability?: {
      morning: Record<string, boolean>;
      evening: Record<string, boolean>;
    };
  }
}

/** Controls do perfil (skills, availability do freelancer) */
export interface UserControlsDto {
  skills?: string[]
  availability?: {
    morning?: Record<string, boolean>
    evening?: Record<string, boolean>
  }
}

/** Usuário retornado em login/register/profile (snake_case conforme API) */
export interface AuthUserDto {
  id: string
  email: string
  name: string | null
  avatarUrl?: string | null
  phone?: string | null
  status?: string
  roles: UserRoleDto[] | string[]
  establishment: EstablishmentDto | null
  /** Endereço do usuário (apenas em GET /auth/profile) */
  address?: import('./address.dto.js').AddressDto | null
  /** Skills e disponibilidade (apenas em GET /auth/profile) */
  controls?: UserControlsDto | null
}

/** Corpo da resposta de POST /auth/login e POST /auth/register */
export interface AuthTokensResponseDto {
  access_token: string
  refresh_token: string
  user: AuthUserDto
}

/** Corpo da resposta de GET /auth/profile */
export interface AuthProfileResponseDto extends AuthUserDto{}

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
