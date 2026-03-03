export interface LoginDto {
  email: string
  password: string
}

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

export interface RegisterDto {
  email: string
  password: string
  name: string
  phone?: string | null
}
