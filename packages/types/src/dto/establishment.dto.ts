import type { AddressDto } from './address.dto.js'

export interface EstablishmentDto {
  id: string
  ownerId: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  website: string | null
  addressId: string | null
  address?: AddressDto | null
  createdAt: string
  updatedAt: string
}

export interface CreateEstablishmentDto {
  ownerId?: string
  name: string
  description?: string | null
  logoUrl?: string | null
  website?: string | null
  addressId?: string | null
}

export interface UpdateEstablishmentDto {
  name?: string
  slug?: string
  description?: string | null
  logoUrl?: string | null
  website?: string | null
  addressId?: string | null
}
