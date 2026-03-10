import type { JobDetailData } from '@/types/job-detail'

export interface JobDetailStatsProps {
  job: JobDetailData
}

export function JobDetailStats({ job }: JobDetailStatsProps) {
  const items = [
    { label: 'Data', value: job.date },
    { label: 'Turno', value: job.shift },
    { label: 'Valor/hora', value: job.rate },
    { label: 'Total', value: job.total },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-secondary/5 bg-white p-4 shadow-sm dark:bg-slate-800/50 dark:border-slate-700"
        >
          <p className="mb-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p
            className={`font-bold text-secondary dark:text-slate-100 ${
              label === 'Valor/hora' ? 'text-lg text-primary' : ''
            }`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  )
}
