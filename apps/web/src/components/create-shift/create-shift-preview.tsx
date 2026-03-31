'use client'

import type { CreateShiftFormValues } from '@/validators/create-shift'

export interface CreateShiftPreviewProps {
  values: Partial<CreateShiftFormValues>
  /** Nome do estabelecimento para o preview */
  establishmentName?: string
  /** Ex.: "4.9 (120+ reviews)" */
  establishmentRating?: string
  /** URL da imagem de capa do preview */
  previewImageUrl?: string
}

function formatDisplayDate(dateStr: string | undefined): string {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}

function formatTimeRange(start: string | undefined, end: string | undefined): string {
  if (!start || !end) return '—'
  const toLabel = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const h12 = h % 12 || 12
    const ampm = h < 12 ? 'AM' : 'PM'
    return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
  }
  return `${toLabel(start)} - ${toLabel(end)}`
}


export function CreateShiftPreview({
  values,
  establishmentName = 'Seu estabelecimento',
  establishmentRating = '4.9 (120+ reviews)',
  previewImageUrl,
}: CreateShiftPreviewProps) {
  const dateLabel = formatDisplayDate(values.date)
  const shiftLabel = formatTimeRange(values.shiftStart, values.shiftEnd)
  const payMode = values.payMode
  const rate =
    values.rate && payMode
      ? payMode === 'hourly'
        ? `R$ ${Number(values.rate).toFixed(2).replace('.', ',')}/h`
        : `R$ ${Number(values.rate).toFixed(2).replace('.', ',')}/dia`
      : values.rate
        ? `R$ ${Number(values.rate).toFixed(2).replace('.', ',')}`
        : '—'
  const requirements: string[] = []
  if (values.description?.trim())
    requirements.push(
      values.description.length > 100
        ? values.description.slice(0, 100) + '…'
        : values.description
    )
  if (values.dressCode?.trim()) requirements.push(`Uniforme: ${values.dressCode}`)

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 sticky top-8">
      <div className="relative h-48 overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60" />
        {previewImageUrl ? (
          <img src={previewImageUrl} alt="" className="size-full object-cover" />
        ) : (
          <div className="size-full bg-slate-600" aria-hidden />
        )}
        <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg">
          {rate}
        </div>
        <div className="absolute bottom-4 left-6">
          <h4 className="text-xl font-bold text-white">
            {values.jobRole || 'Função'}
          </h4>
          <p className="flex items-center gap-1 text-sm text-slate-300">
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {establishmentName}
          </p>
        </div>
      </div>
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-[10px] font-bold uppercase text-slate-500">Data</p>
            <p className="text-sm font-semibold text-secondary dark:text-slate-200">{dateLabel}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <p className="text-[10px] font-bold uppercase text-slate-500">Turno</p>
            <p className="text-sm font-semibold text-secondary dark:text-slate-200">{shiftLabel}</p>
          </div>
        </div>
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">Requisitos</h5>
          <ul className="space-y-2">
            {requirements.length > 0 ? (
              requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <svg className="size-5 shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>{req}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-400 dark:text-slate-500">Preencha a descrição e o uniforme.</li>
            )}
          </ul>
        </div>
        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <svg className="size-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-secondary dark:text-slate-100">{establishmentName}</p>
              <div className="flex items-center gap-1">
                <svg className="size-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-xs font-medium text-slate-500">{establishmentRating}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-primary py-3 text-center font-bold text-white shadow-lg shadow-primary/20">
            Aplicar à vaga
          </div>
        </div>
      </div>
    </div>
  )
}
