import Link from 'next/link'
import type { ServiceOfferDto } from '@org/types'
import { Card, CardHeader, CardContent, CardFooter } from './card'

const BUDGET_TYPE_LABELS: Record<string, string> = {
  FIXED: 'Valor fixo',
  HOURLY: 'Por hora',
  NEGOTIABLE: 'Negociável',
}

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Rascunho',
  OPEN: 'Aberta',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Concluída',
  CANCELLED: 'Cancelada',
}

export interface ServiceOfferCardProps {
  offer: ServiceOfferDto
}

export function ServiceOfferCard({ offer }: ServiceOfferCardProps) {
  const budgetLabel = BUDGET_TYPE_LABELS[offer.budgetType] ?? offer.budgetType
  const statusLabel = STATUS_LABELS[offer.status] ?? offer.status
  const budgetFormatted =
    offer.budget != null
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(offer.budget)
      : null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 line-clamp-2">
            {offer.title}
          </h3>
          <span
            className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
            title={statusLabel}
          >
            {statusLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 line-clamp-3">{offer.description}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>{budgetLabel}</span>
          {budgetFormatted && (
            <>
              <span aria-hidden>·</span>
              <span className="font-medium text-slate-700">
                {budgetFormatted}
              </span>
            </>
          )}
        </div>
        {offer.deadline && (
          <p className="mt-2 text-xs text-slate-500">
            Prazo: {formatDate(offer.deadline)}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href={`/ofertas/${offer.id}`}
          className="text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-600"
        >
          Ver oferta
        </Link>
      </CardFooter>
    </Card>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}
