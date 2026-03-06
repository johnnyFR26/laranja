'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { loginSchema, type LoginFormValues } from '@/validators'

export function LoginForm() {
  const router = useRouter()
  const { login, isAuthenticated, getRedirectPath } = useAuth()
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) router.replace(getRedirectPath())
  }, [isAuthenticated, getRedirectPath, router])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null)
    try {
      const redirectPath = await login({ email: data.email, password: data.password })
      router.push(redirectPath)
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'message' in err ? String((err as { message: string }).message) : 'Erro ao entrar. Tente novamente.'
      setApiError(message)
    }
  }

  return (
    <>
      <div className="mb-8 md:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-secondary dark:text-white">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
            <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </span>
          <span className="text-lg font-bold">
            Grove <span className="text-primary">Opportunities</span>
          </span>
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-secondary dark:text-white">Entrar</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Use seu e-mail e senha para acessar.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>
        {apiError && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {apiError}
          </p>
        )}
        <div className="flex items-center justify-end">
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </>
  )
}
