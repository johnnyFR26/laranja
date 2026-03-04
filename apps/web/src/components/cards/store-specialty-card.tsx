'use client'

import Link from 'next/link'

export interface SpecialtyTag {
  id: string
  label: string
  active?: boolean
  icon?: React.ReactNode
}

export interface StoreSpecialtyCardProps {
  title?: string
  actionLabel?: string
  actionHref?: string
  tags: SpecialtyTag[]
  onAdd?: () => void
}

const DEFAULT_ACTION_LABEL = 'Edit Specialties'
const DEFAULT_TITLE = 'Store Specialty'

export function StoreSpecialtyCard({
  title = DEFAULT_TITLE,
  actionLabel = DEFAULT_ACTION_LABEL,
  actionHref = '#',
  tags,
  onAdd,
}: StoreSpecialtyCardProps) {
  return (
    <section className="flex flex-col justify-between rounded-xl border-2 border-primary-light bg-white p-6 dark:border-primary-light dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {actionHref && (
          <Link
            href={actionHref}
            className="text-sm font-medium text-primary hover:underline"
          >
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              tag.active
                ? 'bg-primary font-bold text-white'
                : 'border border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {tag.icon && <span className="text-lg [&>svg]:h-5 [&>svg]:w-5">{tag.icon}</span>}
            {tag.label}
          </span>
        ))}
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex size-9 items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-400 transition-colors hover:border-primary hover:text-primary dark:border-slate-600"
            aria-label="Adicionar especialidade"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
