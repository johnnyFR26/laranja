'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

/** `/dashboard`: envia dono de estabelecimento ao painel do estabelecimento; demais ao painel freelancer. */
export function DashboardRedirect() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated || !user) {
      router.replace('/login')
      return
    }
    if (user.establishment) {
      router.replace('/dashboard/establishment')
    } else {
      router.replace('/dashboard/freelancer')
    }
  }, [isLoading, isAuthenticated, user, router])

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <p className="text-slate-500 dark:text-slate-400">A redirecionar…</p>
    </main>
  )
}
