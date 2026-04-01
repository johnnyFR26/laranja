'use client'

import Link from 'next/link'
import type { JobDetailData } from '@/types/job-detail'

export interface JobDetailSidebarProps {
  job: JobDetailData
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  )
}

export function JobDetailSidebar({ job }: JobDetailSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="sticky top-24 rounded-2xl border border-secondary/10 bg-white p-8 shadow-xl dark:bg-slate-800">
        <h3 className="mb-6 text-xl font-bold text-secondary dark:text-slate-100">
          Resumo do serviço
        </h3>
        <ul className="mb-8 space-y-4">
          {job.summary.map((item, index) => (
            <li
              key={item.label}
              className={`flex items-center justify-between py-2 ${
                index < job.summary.length - 1 ? 'border-b border-secondary/5' : ''
              }`}
            >
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          <Link
            href={`/jobs/${job.slug}/apply`}
            className="flex w-full items-center justify-center rounded-xl bg-primary py-4 font-black text-white shadow-lg shadow-primary/20 transition-transform hover:bg-primary/90 active:scale-[0.98]"
          >
            CANDIDATAR-SE A ESTA VAGA
          </Link>
          <button
            type="button"
            className="w-full rounded-xl bg-secondary/5 py-4 font-bold text-secondary transition-colors hover:bg-secondary/10 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            SALVAR PARA DEPOIS
          </button>
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
          Ao se candidatar, você concorda com nossos Termos de Uso e Política de Conduta
          Profissional.
        </p>
      </div>

      {job.otherRoles && job.otherRoles.length > 0 && (
        <div className="rounded-2xl border border-secondary/5 bg-white p-6 dark:bg-slate-800/50 dark:border-slate-700">
          <h4 className="mb-4 flex items-center gap-2 font-bold text-secondary dark:text-slate-100">
            <SearchIcon className="size-5 text-primary dark:text-slate-300" />
            Outras vagas aqui
          </h4>
          <div className="space-y-4">
            {job.otherRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/jobs/${role.slug}`}
                className="flex items-center justify-between rounded-lg bg-secondary/5 p-3 transition-colors hover:bg-secondary/10 dark:bg-slate-700/50 dark:hover:bg-slate-700"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {role.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {role.timeLabel}
                  </p>
                </div>
                <span className="font-bold text-primary">{role.rate}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
