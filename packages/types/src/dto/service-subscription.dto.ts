import type { SubscriptionStatusDto } from './enums.js'

export interface ServiceSubscriptionDto {
  id: string
  userId: string
  serviceOfferId: string
  status: SubscriptionStatusDto
  coverLetter: string | null
  proposedBudget: number | null
  createdAt: string
  updatedAt: string
}

export interface CreateServiceSubscriptionDto {
  userId: string
  serviceOfferId: string
  status?: SubscriptionStatusDto
  coverLetter?: string | null
  proposedBudget?: number | null
}

export interface UpdateServiceSubscriptionDto {
  status?: SubscriptionStatusDto
  coverLetter?: string | null
  proposedBudget?: number | null
}
