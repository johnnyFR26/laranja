import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              +500 estabelecimentos ativos
            </div>

            <h1 className="text-balance text-4xl font-black tracking-tight text-secondary sm:text-5xl lg:text-6xl dark:text-white">
              A plataforma completa para{' '}
              <span className="text-primary">hospitalidade</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400">
              Conectamos estabelecimentos aos melhores profissionais freelancers.
              Publique turnos, encontre talentos e gerencie tudo em um só lugar.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/register"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-primary-glow transition-all hover:bg-primary/90 sm:w-auto"
              >
                Começar Grátis
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
                href="#como-funciona"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 px-8 py-3.5 text-base font-semibold text-secondary transition-all hover:border-slate-300 hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:text-white dark:hover:border-slate-600 dark:hover:bg-slate-800/50"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver Demonstração
              </Link>
            </div>
          </div>

          {/* Visual Element - Dashboard Preview */}
          <div className="relative">
            <div className="relative mx-auto aspect-[4/3] max-w-lg overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl lg:max-w-none dark:border-slate-700/50 dark:bg-slate-900">
              {/* Mock Dashboard UI */}
              <div className="flex h-10 items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex gap-1.5">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-yellow-400" />
                  <span className="size-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-auto text-xs text-slate-400">dashboard.grove.app</span>
              </div>
              <div className="p-4">
                {/* Stats Row */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <p className="text-xs font-medium text-primary">Turnos Ativos</p>
                    <p className="text-xl font-bold text-secondary dark:text-white">24</p>
                  </div>
                  <div className="rounded-lg bg-green-500/10 p-3">
                    <p className="text-xs font-medium text-green-600">Confirmados</p>
                    <p className="text-xl font-bold text-secondary dark:text-white">18</p>
                  </div>
                  <div className="rounded-lg bg-blue-500/10 p-3">
                    <p className="text-xs font-medium text-blue-600">Candidatos</p>
                    <p className="text-xl font-bold text-secondary dark:text-white">52</p>
                  </div>
                </div>
                {/* List Items */}
                <div className="space-y-2">
                  {[
                    { role: 'Garçom', time: 'Hoje, 18h-23h', status: 'Confirmado', color: 'green' },
                    { role: 'Barman', time: 'Amanhã, 20h-02h', status: 'Pendente', color: 'yellow' },
                    { role: 'Hostess', time: 'Sex, 19h-00h', status: '3 candidatos', color: 'blue' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <div>
                        <p className="text-sm font-semibold text-secondary dark:text-white">{item.role}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          item.color === 'green'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : item.color === 'yellow'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-primary/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
