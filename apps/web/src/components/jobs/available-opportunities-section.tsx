'use client'

import { useMemo } from 'react'
import { AvailableOpportunityCard } from '@/components/cards/available-opportunity-card'
import type { AvailableOpportunityCardData } from '@/components/cards/available-opportunity-card'
import { useOpenServiceOffers } from '@/hooks/use-service-offers'
import { mapOpenOfferToCard } from '@/lib/map-service-offer-to-card'

/** Fallback visual enquanto a API não tem dados ou falha (mantido de propósito). */
const MOCK_AVAILABLE_OPPORTUNITIES: AvailableOpportunityCardData[] = [
  {
    id: 'a1',
    venueName: 'Pasta House',
    location: 'Upper East',
    role: 'Waiter',
    pay: '$120',
    payUnit: 'day',
    dateLabel: '7 de março',
  },
  {
    id: 'a2',
    venueName: 'Green Garden',
    location: 'Riverside',
    role: 'Hostess',
    pay: '$18',
    payUnit: 'hour',
    dateLabel: '8 de março',
  },
  {
    id: 'a3',
    venueName: 'Sky Lounge',
    location: 'Rooftop',
    role: 'Mixologist',
    pay: '$200',
    payUnit: 'day',
    dateLabel: '9 de março',
  },
  {
    id: 'a4',
    venueName: 'Urban Kitchen',
    location: 'SOHO',
    role: 'Prep Cook',
    pay: '$130',
    payUnit: 'day',
    dateLabel: '10 de março',
  },
]

export function AvailableOpportunitiesSection() {
  const { offers, isLoading, error } = useOpenServiceOffers()

  const displayRows = useMemo(() => {
    if (offers.length > 0) {
      return offers.map(mapOpenOfferToCard)
    }
    return MOCK_AVAILABLE_OPPORTUNITIES
  }, [offers])

  const showApiHint = offers.length === 0 && !isLoading && !error

  return (
    <section className="space-y-4" aria-label="Oportunidades disponíveis">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Oportunidades disponíveis
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Tipo de culinária"
            disabled
          >
            <option value="">Tipo de culinária</option>
            <option value="italian">Italiana</option>
            <option value="french">Francesa</option>
            <option value="casual">Casual</option>
          </select>
          <select
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            aria-label="Localização"
            disabled
          >
            <option value="">Localização</option>
            <option value="downtown">Downtown</option>
            <option value="riverside">Riverside</option>
            <option value="soho">SOHO</option>
          </select>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 opacity-70 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtrar
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 opacity-70 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Mais recente
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-amber-700 dark:text-amber-300" role="status">
          Não foi possível carregar ofertas da API. A mostrar dados de exemplo.
        </p>
      )}
      {showApiHint && (
        <p className="text-sm text-slate-500 dark:text-slate-400" role="status">
          Nenhuma oferta aberta na API. A mostrar dados de exemplo.
        </p>
      )}
      {isLoading && offers.length === 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">A carregar ofertas…</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayRows.map((opp) => (
          <AvailableOpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>

      {displayRows.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-slate-500 dark:text-slate-400">
            Nenhuma oportunidade disponível no momento.
          </p>
        </div>
      )}
    </section>
  )
}
