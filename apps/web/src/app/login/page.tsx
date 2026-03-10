import Link from 'next/link'
import { LoginForm } from '@/components/login/login-form'

export const metadata = {
  title: 'Entrar - Grove Opportunities',
  description: 'Faça login na sua conta.',
}

function GroveLogoIcon({ className }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-lg bg-primary text-white ${className ?? ''}`}
      aria-hidden
    >
      <svg className="size-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </span>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark md:flex-row">
      {/* Metade esquerda: formulário */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <LoginForm />
          <p className="mt-6 text-center text-sm text-slate-500">
            Não tem conta?{' '}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Metade direita: branding Grove Opportunities + ícone maior */}
      <div className="hidden flex-1 items-center justify-center bg-secondary px-8 py-12 md:flex">
        <div className="flex flex-col items-center gap-6 text-center">
          <GroveLogoIcon className="size-24 sm:size-28" />
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Grove <span className="text-primary">Opportunities</span>
          </h1>
          <p className="max-w-xs text-slate-300">
            Conecte-se aos melhores estabelecimentos e turnos de hospitalidade.
          </p>
        </div>
      </div>
    </div>
  )
}
