'use client'

import Link from 'next/link'
import type { ServiceOfferOpenApiDto } from '@org/types'

function isExpiringToday(deadline: string | null): boolean {
  if (!deadline) return false
  const d = new Date(deadline)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

function formatBudget(budget: string | number | null, budgetType: string): string {
  if (budgetType === 'NEGOTIABLE') return 'Negociável'
  if (budget == null) return '—'
  const value = typeof budget === 'string' ? parseFloat(budget) : budget
  if (Number.isNaN(value)) return '—'
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  return budgetType === 'HOURLY' ? `${formatted}/h` : formatted
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Rascunho',
  OPEN: 'Aberta',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Concluída',
  CANCELLED: 'Cancelada',
}

const STATUS_BADGE: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-600',
  OPEN: 'bg-green-100 text-green-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

export interface EstablishmentExpiringOffersCarouselProps {
  offers: ServiceOfferOpenApiDto[]
}

export function EstablishmentExpiringOffersCarousel({ offers }: EstablishmentExpiringOffersCarouselProps) {
  const expiring = offers.filter(
    (o) => isExpiringToday(o.deadline) && o.status !== 'COMPLETED' && o.status !== 'CANCELLED',
  )

  if (expiring.length === 0) return null

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-full bg-primary/10">
          <svg className="size-4 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 18v4h4l-1.22-1.22C18.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 3.08 7.07 6.22 8.78L7 22h4v-4l-2.28 1.72C6.81 18 5 15.21 5 12c0-4.08 3.05-7.44 7-7.93V2.05z" />
          </svg>
        </span>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Expiram hoje
        </h3>
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
          {expiring.length}
        </span>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {expiring.map((offer) => {
          const budgetStr = formatBudget(offer.budget, offer.budgetType)
          const statusLabel = STATUS_LABELS[offer.status] ?? offer.status
          const badgeCls = STATUS_BADGE[offer.status] ?? 'bg-slate-100 text-slate-600'

          return (
            <div
              key={offer.slug}
              className="w-72 shrink-0 snap-start rounded-xl border border-primary/30 bg-white p-4 shadow-sm dark:border-primary/20 dark:bg-slate-900"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeCls}`}>
                  {statusLabel}
                </span>
                <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                  ⏳ Expira hoje
                </span>
              </div>

              <h4 className="mb-1 line-clamp-2 font-bold text-slate-900 dark:text-slate-100">
                {offer.title}
              </h4>
              <p className="mb-3 line-clamp-2 text-xs text-slate-500">{offer.description}</p>

              {offer.category?.name && (
                <span className="mb-3 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {offer.category.name}
                </span>
              )}

              <p className="mb-3 text-sm font-semibold text-secondary dark:text-primary">{budgetStr}</p>

              <Link
                href={`/jobs/${offer.slug}`}
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
              >
                Ver detalhes
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
