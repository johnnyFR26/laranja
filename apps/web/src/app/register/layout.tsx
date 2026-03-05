import Link from 'next/link'

export const metadata = {
  title: 'Cadastro - Grove Opportunities',
  description: 'Registro de freelancers e estabelecimentos',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight text-secondary dark:text-white">
                Grove <span className="text-primary">Opportunities</span>
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-500 sm:block">
                Já tem uma conta?
              </span>
              <Link
                href="/login"
                className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:opacity-90"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <span className="flex items-center gap-2 text-sm font-bold opacity-50">
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Grove Opportunities
            </span>
            <div className="flex gap-8 text-sm text-slate-500">
              <Link href="#" className="transition-colors hover:text-primary">
                Política de Privacidade
              </Link>
              <Link href="#" className="transition-colors hover:text-primary">
                Termos de Uso
              </Link>
              <Link href="#" className="transition-colors hover:text-primary">
                Cookies
              </Link>
            </div>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Grove Opportunities. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
