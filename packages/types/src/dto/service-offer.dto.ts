import type { BudgetTypeDto, ServiceOfferStatusDto } from './enums.js'

export interface ServiceOfferDto {
  id: string
  establishmentId: string
  categoryId: string | null
  title: string
  description: string
  budget: number | null
  budgetType: BudgetTypeDto
  status: ServiceOfferStatusDto
  deadline: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateServiceOfferDto {
  establishmentId: string
  categoryId?: string | null
  title: string
  description: string
  budget?: number | null
  budgetType?: BudgetTypeDto
  status?: ServiceOfferStatusDto
  deadline?: string | null
}

export interface UpdateServiceOfferDto {
  categoryId?: string | null
  title?: string
  description?: string
  budget?: number | null
  budgetType?: BudgetTypeDto
  status?: ServiceOfferStatusDto
  deadline?: string | null
}
