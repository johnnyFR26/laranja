'use client'

import type {
  FilterServiceOfferQueryDto,
  PaginatedServiceOffersListDto,
  ServiceOfferOpenApiDto,
} from '@org/types'
import { useCallback, useEffect, useState } from 'react'
import { apiClient } from '@/lib/api-client'
import { serviceOffersEndpoints } from '@/config/api/endpoints'

/**
 * Query params alinhados ao FilterServiceOfferDto da API (GET /api/service-offers).
 * `establishmentId` e `categoryId` são slugs UUID (não ids numéricos).
 * @see apps/api/src/modules/service-offers/dto/filter-service-offer.dto.ts
 */
export type FilterServiceOffersParams = FilterServiceOfferQueryDto

export function useOpenServiceOffers() {
  const [offers, setOffers] = useState<ServiceOfferOpenApiDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const { data } = await apiClient.get<ServiceOfferOpenApiDto[]>(serviceOffersEndpoints.open)
      const list = Array.isArray(data) ? data : []
      setOffers(list)
    } catch (err) {
      console.error('Failed to load open service offers:', err)
      setError(err instanceof Error ? err : new Error('Falha ao carregar ofertas'))
      setOffers([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return {
    offers,
    isLoading,
    error,
    refetch,
  }
}

/**
 * Lista paginada (GET /api/service-offers). `filters` é comparado por JSON para evitar loops.
 */
export function usePaginatedServiceOffers(filters: FilterServiceOfferQueryDto = {}) {
  const [result, setResult] = useState<PaginatedServiceOffersListDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const filtersKey = JSON.stringify(filters)

  const refetch = useCallback(
    async (override?: FilterServiceOfferQueryDto) => {
      setIsLoading(true)
      setError(null)
      const merged = { ...JSON.parse(filtersKey) as FilterServiceOfferQueryDto, ...override }
      try {
        const { data } = await apiClient.get<PaginatedServiceOffersListDto>(
          serviceOffersEndpoints.list,
          { params: merged },
        )
        if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
          setResult(data)
        } else {
          setResult(null)
        }
      } catch (err) {
        console.error('Failed to load service offers:', err)
        setError(err instanceof Error ? err : new Error('Falha ao carregar ofertas'))
        setResult(null)
      } finally {
        setIsLoading(false)
      }
    },
    [filtersKey],
  )

  useEffect(() => {
    void refetch()
  }, [filtersKey, refetch])

  return {
    result,
    offers: result?.data ?? [],
    total: result?.total ?? 0,
    page: result?.page ?? 1,
    totalPages: result?.totalPages ?? 0,
    isLoading,
    error,
    refetch,
  }
}
