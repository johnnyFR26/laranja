'use client'

import Link from 'next/link'
import type { ServiceOfferOpenApiDto } from '@org/types'

function formatBudget(budget: string | number | null, budgetType: string): string {
  if (budgetType === 'NEGOTIABLE') return 'Negociável'
  if (budget == null) return '—'
  const value = typeof budget === 'string' ? parseFloat(budget) : budget
  if (Number.isNaN(value)) return '—'
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  return budgetType === 'HOURLY' ? `${formatted}/h` : formatted
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return '—'
  try {
    return new Date(deadline).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return deadline
  }
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Rascunho',
  OPEN: 'Aberta',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Concluída',
  CANCELLED: 'Cancelada',
}

const STATUS_STYLES: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-slate-600',
  OPEN: 'bg-green-100 text-green-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

const BUDGET_TYPE_LABELS: Record<string, string> = {
  FIXED: 'Fixo',
  HOURLY: 'Por hora',
  NEGOTIABLE: 'Negociável',
}

function SkeletonRow() {
  return (
    <tr className="border-b border-slate-100 dark:border-slate-800">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        </td>
      ))}
    </tr>
  )
}

export interface EstablishmentServiceOffersTableProps {
  offers: ServiceOfferOpenApiDto[]
  isLoading: boolean
  actionLabel?: string
  actionHref?: string
}

export function EstablishmentServiceOffersTable({
  offers,
  isLoading,
  actionLabel = 'Ver todos os serviços',
  actionHref = '/dashboard/establishment/services',
}: EstablishmentServiceOffersTableProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Meus serviços
        </h3>
        <Link
          href={actionHref}
          className="text-sm font-medium text-slate-500 transition-colors hover:text-primary"
        >
          {actionLabel}
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="bg-secondary text-white dark:bg-secondary/50">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  Serviço
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  Orçamento
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  Prazo
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading && (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              )}

              {!isLoading && offers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-slate-400 dark:text-slate-500"
                  >
                    Nenhum serviço encontrado. Crie sua primeira vaga!
                  </td>
                </tr>
              )}

              {!isLoading &&
                offers.map((offer) => {
                  const statusLabel = STATUS_LABELS[offer.status] ?? offer.status
                  const statusCls = STATUS_STYLES[offer.status] ?? 'bg-slate-100 text-slate-600'
                  const budgetTypeLabel = BUDGET_TYPE_LABELS[offer.budgetType] ?? offer.budgetType
                  const budgetStr = formatBudget(offer.budget, offer.budgetType)
                  const deadlineStr = formatDeadline(offer.deadline)

                  return (
                    <tr
                      key={offer.slug}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {offer.title}
                        </p>
                        {offer.category?.name && (
                          <p className="mt-0.5 text-xs text-slate-500">{offer.category.name}</p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusCls}`}>
                          {statusLabel}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {budgetStr}
                        </p>
                        <p className="text-xs text-slate-500">{budgetTypeLabel}</p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {deadlineStr}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={`/jobs/${offer.slug}`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
                        >
                          Ver detalhes
                        </Link>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
