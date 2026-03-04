import { UrgentShiftsCarousel } from '@/components/carousel/urgent-shifts-carousel'
import { AvailableOpportunityCard } from '@/components/cards/available-opportunity-card'
import type { UrgentShiftCardData } from '@/components/cards/urgent-shift-card'
import type { AvailableOpportunityCardData } from '@/components/cards/available-opportunity-card'

const MOCK_URGENT_SHIFTS: UrgentShiftCardData[] = [
  {
    id: 'u1',
    venueName: 'The Grand Bistro',
    location: 'Downtown',
    role: 'Server Assistant',
    pay: '$150',
    payUnit: 'day',
    dateLabel: '5 de março',
    timeRange: '16h – 23h',
    expiringIn: '15 min',
    icon: 'restaurant',
  },
  {
    id: 'u2',
    venueName: 'Sunrise Cafe',
    location: 'North Harbor',
    role: 'Barista',
    pay: '$20',
    payUnit: 'hour',
    dateLabel: '5 de março',
    timeRange: '6h – 12h',
    expiringIn: '45 min',
    icon: 'cafe',
  },
  {
    id: 'u3',
    venueName: 'City Center Hotel',
    location: 'Financial District',
    role: 'Porter',
    pay: '$180',
    payUnit: 'day',
    dateLabel: '6 de março',
    timeRange: '8h – 16h',
    expiringIn: '2 horas',
    icon: 'hotel',
  },
  {
    id: 'u4',
    venueName: 'Ocean Grill',
    location: 'Bay Area',
    role: 'Line Cook',
    pay: '$200',
    payUnit: 'day',
    dateLabel: '7 de março',
    timeRange: '12h – 20h',
    expiringIn: '1 hora',
    icon: 'grill',
  },
]

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

export const metadata = {
  title: 'Open jobs - Grove Opportunities',
  description: 'Turnos urgentes e ofertas de serviço disponíveis',
}

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Oportunidades
        </h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Turnos urgentes e vagas disponíveis para você
        </p>
      </header>

      <UrgentShiftsCarousel shifts={MOCK_URGENT_SHIFTS} />

      <section className="space-y-4" aria-label="Oportunidades disponíveis">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Oportunidades disponíveis
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Tipo de culinária"
            >
              <option value="">Tipo de culinária</option>
              <option value="italian">Italiana</option>
              <option value="french">Francesa</option>
              <option value="casual">Casual</option>
            </select>
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Localização"
            >
              <option value="">Localização</option>
              <option value="downtown">Downtown</option>
              <option value="riverside">Riverside</option>
              <option value="soho">SOHO</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtrar
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Mais recente
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_AVAILABLE_OPPORTUNITIES.map((opp) => (
            <AvailableOpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>

        {MOCK_AVAILABLE_OPPORTUNITIES.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-slate-500 dark:text-slate-400">
              Nenhuma oportunidade disponível no momento.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
