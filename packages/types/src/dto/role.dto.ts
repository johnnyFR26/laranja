export interface RoleDto {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
}

export interface CreateRoleDto {
  name: string
  slug: string
  description?: string | null
}

export interface UpdateRoleDto {
  name?: string
  slug?: string
  description?: string | null
}
