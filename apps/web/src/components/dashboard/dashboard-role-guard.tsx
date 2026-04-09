'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

type GuardMode = 'freelancer-only' | 'establishment-only'

interface DashboardRoleGuardProps {
  mode: GuardMode
  children: ReactNode
}

/**
 * `freelancer-only`: utilizadores com estabelecimento são enviados ao painel do estabelecimento.
 * `establishment-only`: utilizadores sem estabelecimento são enviados ao painel freelancer.
 */
export function DashboardRoleGuard({ mode, children }: DashboardRoleGuardProps) {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || !user) {
      router.replace('/login')
      return
    }
    if (mode === 'freelancer-only' && user.establishment) {
      router.replace('/dashboard/establishment')
      return
    }
    if (mode === 'establishment-only' && !user.establishment) {
      router.replace('/dashboard/freelancer')
    }
  }, [isLoading, isAuthenticated, user, mode, router])

  if (isLoading || !user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <p className="text-slate-500 dark:text-slate-400">A carregar…</p>
      </main>
    )
  }

  if (mode === 'freelancer-only' && user.establishment) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <p className="text-slate-500 dark:text-slate-400">A redirecionar…</p>
      </main>
    )
  }

  if (mode === 'establishment-only' && !user.establishment) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <p className="text-slate-500 dark:text-slate-400">A redirecionar…</p>
      </main>
    )
  }

  return <>{children}</>
}
