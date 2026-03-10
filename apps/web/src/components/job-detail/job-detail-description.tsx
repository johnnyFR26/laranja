import type { JobDetailData } from '@/types/job-detail'

export interface JobDetailDescriptionProps {
  job: JobDetailData
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

export function JobDetailDescription({ job }: JobDetailDescriptionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-secondary dark:text-slate-100">
        Descrição da vaga
      </h3>
      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
        {job.description}
      </p>
      <div className="flex flex-wrap gap-2 pt-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="flex items-center gap-2 rounded-lg bg-secondary/5 px-4 py-2 text-sm font-medium text-secondary dark:bg-slate-700/50 dark:text-slate-300"
          >
            <CheckIcon className="size-4 text-primary" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
