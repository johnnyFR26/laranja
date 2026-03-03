import type { UserStatusDto } from './enums.js'

export interface UserDto {
  id: string
  email: string
  name: string
  phone: string | null
  avatarUrl: string | null
  status: UserStatusDto
  addressId: string | null
  createdAt: string
  updatedAt: string
}

export type { UserStatusDto }

export interface CreateUserDto {
  email: string
  name: string
  phone?: string | null
  avatarUrl?: string | null
  addressId?: string | null
}

export interface UpdateUserDto {
  name?: string
  phone?: string | null
  avatarUrl?: string | null
  addressId?: string | null
  status?: UserStatusDto
}
