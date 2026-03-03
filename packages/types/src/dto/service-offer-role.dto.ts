export interface ServiceOfferRoleDto {
  id: string
  serviceOfferId: string
  roleId: string
}

export interface CreateServiceOfferRoleDto {
  serviceOfferId: string
  roleId: string
}
