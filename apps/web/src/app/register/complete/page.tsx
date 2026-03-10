import Link from 'next/link'

export const metadata = {
  title: 'Cadastro concluído - Grove Opportunities',
  description: 'Seu perfil está em análise. Você será notificado por e-mail quando estiver verificado.',
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  )
}

function VerifiedUserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  )
}

function ArrowForwardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

export default function RegisterCompletePage() {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl shadow-primary/5 dark:border-slate-800 dark:bg-slate-900">
        {/* Barra decorativa */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-primary/80 to-primary" />

        <div className="flex flex-col items-center p-8 text-center md:p-12">
          {/* Ícone de sucesso */}
          <div className="relative mb-8">
            <span className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" aria-hidden />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 md:size-32">
              <CheckCircleIcon className="size-12 md:size-16" />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-secondary dark:text-slate-50 md:text-4xl">
            Cadastro concluído
          </h1>

          <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-primary-light bg-primary/10 px-6 py-2 dark:bg-primary/5">
            <VerifiedUserIcon className="size-5 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Verificação pendente
            </span>
          </div>

          <p className="mb-10 max-w-sm text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Seu perfil está em análise pela nossa equipe. Enviaremos um e-mail quando você estiver
            verificado para começar a pegar turnos.
          </p>

          <div className="flex w-full flex-col sm:flex-row sm:justify-center">
            <Link
              href="/jobs"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-4 text-lg font-bold text-white shadow-primary-glow transition-transform hover:scale-[1.02] active:scale-95 sm:max-w-xs"
            >
              <span className="truncate">Ver vagas</span>
              <ArrowForwardIcon className="size-5 shrink-0" />
            </Link>
          </div>

          <div className="mt-8 grid w-full grid-cols-2 gap-4 border-t border-slate-100 pt-8 dark:border-slate-800">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                Tempo estimado
              </span>
              <span className="font-semibold text-secondary dark:text-slate-200">
                24–48 horas
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                Status
              </span>
              <span className="font-semibold text-secondary dark:text-slate-200">
                Em análise
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
