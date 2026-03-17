export interface EstablishmentDto {
  id: string
  ownerId: string
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  website: string | null
  addressId: string | null
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
