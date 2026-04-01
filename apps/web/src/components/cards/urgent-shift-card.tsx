import Link from 'next/link'

export interface UrgentShiftCardData {
  /** Slug UUID da oferta (URL /jobs/:slug) */
  slug: string
  venueName: string
  location: string
  role: string
  pay: string
  payUnit: string
  dateLabel: string
  timeRange: string
  expiringIn: string
  icon?: 'restaurant' | 'cafe' | 'hotel' | 'grill'
}

const ICONS: Record<NonNullable<UrgentShiftCardData['icon']>, string> = {
  restaurant: '🍽️',
  cafe: '☕',
  hotel: '🏨',
  grill: '🔥',
}

export interface UrgentShiftCardProps {
  shift: UrgentShiftCardData
}

export function UrgentShiftCard({ shift }: UrgentShiftCardProps) {
  const icon = shift.icon ? ICONS[shift.icon] : '📋'
  return (
    <article
      className="flex w-[280px] shrink-0 flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
      data-testid="urgent-shift-card"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-xl dark:bg-slate-800" aria-hidden>
          {icon}
        </span>
        <span className="shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
          Expirando em {shift.expiringIn}
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">
        {shift.venueName}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{shift.location}</p>
      <p className="mt-1 text-sm font-medium text-primary">{shift.role}</p>
      <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
        {shift.pay}
        <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
          /{shift.payUnit}
        </span>
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {shift.dateLabel} • {shift.timeRange}
      </p>
      <Link
        href={`/jobs/${shift.slug}/apply`}
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-primary-glow transition-opacity hover:opacity-90"
      >
        Aplicação rápida
      </Link>
    </article>
  )
}
