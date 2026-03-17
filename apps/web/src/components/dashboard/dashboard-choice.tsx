'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export function DashboardChoice() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return
    if (!user?.establishment) {
      router.replace('/dashboard/freelancer')
    }
  }, [user, isLoading, router])

  if (isLoading || !user?.establishment) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="text-center text-slate-500 dark:text-slate-400">
          Carregando…
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-secondary dark:text-slate-100">
            Onde deseja acessar o painel?
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Escolha o tipo de dashboard para continuar.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/dashboard/establishment"
            className="group flex flex-col rounded-xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-primary hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary"
          >
            <span className="mb-4 flex size-14 items-center justify-center rounded-xl bg-secondary text-white transition-colors group-hover:bg-secondary/90">
              <svg className="size-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-secondary dark:text-white">
              Estabelecimento
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Histórico de profissionais que trabalharam no seu estabelecimento.
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-bold text-primary">
              Acessar painel
              <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="/dashboard/freelancer"
            className="group flex flex-col rounded-xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-primary hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-primary"
          >
            <span className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary text-white transition-colors group-hover:bg-primary/90">
              <svg className="size-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-secondary dark:text-white">
              Freelancer
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Seus serviços, estabelecimentos, status e valores recebidos.
            </p>
            <span className="mt-4 inline-flex items-center text-sm font-bold text-primary">
              Acessar painel
              <svg className="ml-1 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
