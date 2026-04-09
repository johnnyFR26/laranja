import type { EstablishmentDto } from '@org/types'
import { cache } from 'react'
import axios from 'axios'
import { establishmentsEndpoints } from '@/config/api/endpoints'
import { apiServerClient } from '@/lib/api-client'

export interface PaginatedEstablishmentsDto {
  data: EstablishmentDto[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/** Estabelecimento público com ofertas (GET /establishments/:slug). */
export interface EstablishmentPublicDetailDto extends Omit<EstablishmentDto, 'address'> {
  address?: {
    street?: string | null
    city?: string | null
    state?: string | null
  } | null
  serviceOffers?: Array<{
    slug: string
    title: string
    status?: string
  }>
}

async function fetchEstablishmentsPageUncached(
  page: number,
  limit: number,
): Promise<PaginatedEstablishmentsDto | null> {
  try {
    const { data } = await apiServerClient.get<PaginatedEstablishmentsDto>(
      establishmentsEndpoints.list,
      { params: { page, limit } },
    )
    if (data && Array.isArray(data.data)) return data
    return null
  } catch {
    return null
  }
}

export const getEstablishmentsPage = cache(fetchEstablishmentsPageUncached)

export const getEstablishmentPublicDetail = cache(
  async (slug: string): Promise<EstablishmentPublicDetailDto | null> => {
    const key = slug?.trim()
    if (!key) return null
    try {
      const { data } = await apiServerClient.get<EstablishmentPublicDetailDto>(
        establishmentsEndpoints.bySlug(key),
      )
      return data ?? null
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) return null
      return null
    }
  },
)

/** Para sitemap: percorre páginas públicas de estabelecimentos. */
export async function fetchAllEstablishmentSlugsForSitemap(): Promise<string[]> {
  const slugs: string[] = []
  const limit = 100
  const maxPages = 100
  let page = 1
  while (page <= maxPages) {
    const res = await fetchEstablishmentsPageUncached(page, limit)
    if (!res?.data?.length) break
    for (const row of res.data) {
      if (row.slug) slugs.push(row.slug)
    }
    if (page >= res.totalPages) break
    page += 1
  }
  return slugs
}
