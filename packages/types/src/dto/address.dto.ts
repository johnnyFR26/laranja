export interface AddressDto {
  id: string
  slug: string
  street: string
  number: string | null
  complement: string | null
  neighborhood: string | null
  city: string
  state: string
  zipCode: string
  country: string
  createdAt: string
  updatedAt: string
}

export interface CreateAddressDto {
  street: string
  number?: string | null
  complement?: string | null
  neighborhood?: string | null
  city: string
  state: string
  zipCode: string
  country?: string
}

export interface UpdateAddressDto {
  street?: string
  number?: string | null
  complement?: string | null
  neighborhood?: string | null
  city?: string
  state?: string
  zipCode?: string
  country?: string
}
