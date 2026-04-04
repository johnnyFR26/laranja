import type { ServiceOfferOpenApiDto } from '@org/types'
import { cache } from 'react'
import { serviceOffersEndpoints } from '@/config/api/endpoints'
import { apiServerClient } from '@/lib/api-client'

async function fetchOpenServiceOffersUncached(): Promise<ServiceOfferOpenApiDto[]> {
  try {
    const { data } = await apiServerClient.get<ServiceOfferOpenApiDto[]>(
      serviceOffersEndpoints.open,
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

/** Lista de ofertas abertas para SSR / sitemap (uma chamada por request). */
export const getOpenServiceOffers = cache(fetchOpenServiceOffersUncached)
