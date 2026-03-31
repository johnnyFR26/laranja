import type { ServiceOfferOpenApiDto } from '@org/types'
import type { AvailableOpportunityCardData } from '@/components/cards/available-opportunity-card'

function parseBudget(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value))
  return Number.isFinite(n) ? n : null
}

function formatPayParts(
  budget: number | null,
  budgetType: string
): { pay: string; payUnit: string } {
  if (budget === null) {
    return { pay: '—', payUnit: 'negociável' }
  }
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(budget)
  if (budgetType === 'HOURLY') return { pay: formatted, payUnit: 'hora' }
  if (budgetType === 'FIXED') return { pay: formatted, payUnit: 'serviço' }
  return { pay: formatted, payUnit: 'negociável' }
}

function formatDateLabel(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function mapOpenOfferToCard(offer: ServiceOfferOpenApiDto): AvailableOpportunityCardData {
  const budget = parseBudget(offer.budget)
  const { pay, payUnit } = formatPayParts(budget, offer.budgetType)
  const location =
    offer.establishment?.address?.city?.trim() ||
    offer.establishment?.address?.street?.trim() ||
    'Local a combinar'
  const dateLabel = formatDateLabel(offer.deadline) || formatDateLabel(offer.createdAt) || '—'

  return {
    id: String(offer.slug),
    venueName: offer.establishment?.name ?? 'Estabelecimento',
    location,
    role: offer.title,
    pay,
    payUnit,
    dateLabel,
    imageUrl: null,
  }
}
