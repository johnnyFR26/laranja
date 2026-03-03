export interface CategoryDto {
  id: string
  name: string
  slug: string
  description: string | null
  createdAt: string
}

export interface CreateCategoryDto {
  name: string
  slug: string
  description?: string | null
}

export interface UpdateCategoryDto {
  name?: string
  slug?: string
  description?: string | null
}
