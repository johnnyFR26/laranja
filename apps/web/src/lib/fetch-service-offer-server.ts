import type { ServiceOfferDetailApiDto } from '@org/types'
import axios from 'axios'
import { cache } from 'react'
import { apiServerClient } from '@/lib/api-client'

async function fetchServiceOfferBySlugUncached(
  slug: string
): Promise<ServiceOfferDetailApiDto | null> {
  try {
    const { data } = await apiServerClient.get<ServiceOfferDetailApiDto>(
      `/service-offers/${encodeURIComponent(slug)}`,
    )
    return data ?? null
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) return null
    return null
  }
}

/** Uma query por request (dedupe entre metadata e página). */
export const getServiceOffer = cache(fetchServiceOfferBySlugUncached)
