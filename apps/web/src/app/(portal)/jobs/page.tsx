import { UrgentShiftsCarousel } from '@/components/carousel/urgent-shifts-carousel'
import { AvailableOpportunitiesSection } from '@/components/jobs'
import type { UrgentShiftCardData } from '@/components/cards/urgent-shift-card'
import { getOpenServiceOffers } from '@/lib/fetch-open-service-offers-server'

const MOCK_URGENT_SHIFTS: UrgentShiftCardData[] = [
  {
    slug: 'u1',
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
    slug: 'u2',
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
    slug: 'u3',
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
    slug: 'u4',
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

export const metadata = {
  title: 'Oportunidades e ofertas de serviço | Grove Opportunities',
  description:
    'Turnos urgentes e ofertas de serviço em hospitalidade. Encontre vagas por localização e função.',
}

export default async function JobsPage() {
  const initialOffers = await getOpenServiceOffers()

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

      <AvailableOpportunitiesSection initialOffers={initialOffers} />
    </div>
  )
}
