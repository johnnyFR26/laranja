import type { ServiceOfferDetailApiDto } from '@org/types'
import type { JobDetailData } from '@/types/job-detail'

function parseBudget(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value))
  return Number.isFinite(n) ? n : null
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

function formatAddress(
  address: ServiceOfferDetailApiDto['establishment']['address'] | null | undefined
): string {
  if (!address) return 'Endereço a combinar'
  const parts = [
    [address.street, address.number].filter(Boolean).join(', '),
    [address.city, address.state].filter(Boolean).join(' - '),
  ].filter(Boolean)
  return parts.join('\n') || 'Endereço a combinar'
}

function mapsSearchUrl(
  address: ServiceOfferDetailApiDto['establishment']['address'] | null | undefined
): string | undefined {
  if (!address) return undefined
  const q = `${address.street} ${address.number ?? ''} ${address.city} ${address.state}`.trim()
  if (!q) return undefined
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
}

export function mapServiceOfferDetailToJobDetail(offer: ServiceOfferDetailApiDto): JobDetailData {
  const budget = parseBudget(offer.budget)
  const formattedMoney = (n: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)

  let rate = 'A combinar'
  let total = 'A combinar'
  if (budget !== null) {
    if (offer.budgetType === 'HOURLY') {
      rate = `${formattedMoney(budget)}/h`
      total = 'A combinar'
    } else if (offer.budgetType === 'FIXED') {
      rate = formattedMoney(budget)
      total = formattedMoney(budget)
    } else {
      rate = 'Negociável'
      total = 'Negociável'
    }
  }

  const categoryName = offer.category?.name?.trim() || null
  const subtitle = categoryName
    ? `${offer.establishment.name} • ${categoryName}`
    : `${offer.establishment.name} • Serviço`

  const skills =
    offer.requiredRoles?.map((r) => r.role.name).filter(Boolean) ??
    ([] as string[])
  const skillsSafe = skills.length > 0 ? skills : ['Detalhes na descrição']

  const tags: JobDetailData['tags'] = []
  if (offer.status === 'OPEN') {
    tags.push({ label: 'Aberta', variant: 'urgent' })
  }

  const addr = offer.establishment.address ?? null
  const directionsUrl = mapsSearchUrl(addr)

  const subs = offer._count?.subscriptions ?? 0

  return {
    slug: offer.slug,
    title: offer.title,
    subtitle,
    heroImageUrl: offer.establishment.logoUrl,
    tags: tags.length > 0 ? tags : undefined,
    date: formatDate(offer.deadline) !== '—' ? formatDate(offer.deadline) : formatDate(offer.createdAt),
    shift: 'A combinar',
    rate,
    total,
    description: offer.description,
    skills: skillsSafe,
    establishment: {
      name: offer.establishment.name,
      description: offer.establishment.description ?? '',
      logoUrl: offer.establishment.logoUrl,
      verified: true,
    },
    location: {
      address: formatAddress(addr),
      directionsUrl,
    },
    summary: [
      { label: 'Função', value: offer.title },
      { label: 'Status', value: offer.status },
      { label: 'Categoria', value: categoryName ?? '—' },
      { label: 'Candidaturas', value: String(subs) },
    ],
  }
}
