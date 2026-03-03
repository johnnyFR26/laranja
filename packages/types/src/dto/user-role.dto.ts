export interface UserRoleDto {
  id: string
  userId: string
  roleId: string
  createdAt: string
}

export interface CreateUserRoleDto {
  userId: string
  roleId: string
}
