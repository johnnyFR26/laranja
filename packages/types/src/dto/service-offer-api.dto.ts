import type { BudgetTypeDto, ServiceOfferStatusDto } from './enums.js'
import type { ServiceOfferDto } from './service-offer.dto.js'

/**
 * Item de GET /api/service-offers/open — ofertas abertas com includes (estabelecimento, categoria).
 * Formato serializado JSON (Decimal como string | number).
 */
export interface ServiceOfferOpenApiDto {
  id: number
  slug: string
  title: string
  description: string
  budget: string | number | null
  budgetType: BudgetTypeDto | string
  status: ServiceOfferStatusDto | string
  deadline: string | null
  createdAt: string
  establishment: {
    name: string
    address?: { city?: string | null; street?: string | null } | null
  }
  category?: { name: string | null } | null
}

/** Role aninhada em GET /api/service-offers/:id (requiredRoles). */
export interface ServiceOfferDetailRoleApiDto {
  role: {
    name: string
  }
}

/** Estabelecimento resumido na resposta de detalhe da oferta. */
export interface ServiceOfferDetailEstablishmentApiDto {
  name: string
  description: string | null
  logoUrl: string | null
}

/** Endereço incluído no estabelecimento da oferta (detalhe). */
export interface ServiceOfferDetailAddressApiDto {
  street: string
  number?: string | null
  city: string
  state: string
}

/**
 * Payload de GET /api/service-offers/:id (Prisma + includes).
 * Valores numéricos/Decimal vêm como string ou number no JSON.
 */
export interface ServiceOfferDetailApiDto {
  id: number
  slug: string
  title: string
  description: string
  budget: string | number | null
  budgetType: BudgetTypeDto | string
  status: ServiceOfferStatusDto | string
  deadline: string | null
  createdAt: string
  establishment: ServiceOfferDetailEstablishmentApiDto & {
    address?: ServiceOfferDetailAddressApiDto | null
  }
  category?: { name: string | null } | null
  requiredRoles?: ServiceOfferDetailRoleApiDto[]
  _count?: { subscriptions?: number; reviews?: number }
}

/**
 * Query params de GET /api/service-offers (FilterServiceOfferDto + paginação).
 */
export interface FilterServiceOfferQueryDto {
  page?: number
  limit?: number
  orderBy?: string
  order?: 'asc' | 'desc'
  search?: string
  establishmentId?: string
  categoryId?: string
  status?: ServiceOfferStatusDto | string
  budgetType?: BudgetTypeDto | string
  minBudget?: number
  maxBudget?: number
}

/** Corpo de lista paginada retornado dentro de `data` após o envelope da API. */
export interface PaginatedServiceOffersListDto {
  data: ServiceOfferDto[]
  total: number
  page: number
  limit: number
  totalPages: number
}
