import Link from 'next/link'

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-secondary px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Pronto para transformar sua operação?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-slate-300">
          Junte-se a centenas de estabelecimentos e milhares de profissionais que já estão
          usando o Grove Opportunities.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register/establishment"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-primary-glow transition-all hover:bg-primary/90 sm:w-auto"
          >
            Sou Estabelecimento
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/register/freelancer"
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10 sm:w-auto"
          >
            Sou Freelancer
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Cadastro gratuito · Sem compromisso · Comece em minutos
        </p>
      </div>
    </section>
  )
}
