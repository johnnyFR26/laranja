const stepsEstablishment = [
  {
    step: '01',
    title: 'Crie sua conta',
    description: 'Cadastre seu estabelecimento em poucos minutos. É grátis para começar.',
  },
  {
    step: '02',
    title: 'Publique turnos',
    description: 'Defina as vagas, horários e requisitos. Nossa plataforma encontra candidatos automaticamente.',
  },
  {
    step: '03',
    title: 'Selecione profissionais',
    description: 'Analise perfis, avaliações e histórico. Escolha os melhores para seu estabelecimento.',
  },
  {
    step: '04',
    title: 'Gerencie tudo',
    description: 'Acompanhe presenças, avalie desempenho e processe pagamentos de forma simples.',
  },
]

const stepsFreelancer = [
  {
    step: '01',
    title: 'Cadastre-se',
    description: 'Crie seu perfil profissional destacando suas habilidades e experiência.',
  },
  {
    step: '02',
    title: 'Encontre oportunidades',
    description: 'Receba notificações de turnos compatíveis com seu perfil e disponibilidade.',
  },
  {
    step: '03',
    title: 'Candidate-se',
    description: 'Escolha os turnos que mais combinam com você e envie sua candidatura.',
  },
  {
    step: '04',
    title: 'Trabalhe e ganhe',
    description: 'Compareça aos turnos, receba avaliações e seja pago de forma segura.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-slate-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 dark:bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Como Funciona</p>
          <h2 className="mt-2 text-balance text-3xl font-black tracking-tight text-secondary sm:text-4xl dark:text-white">
            Simples para todos
          </h2>
          <p className="mt-4 text-pretty text-lg text-slate-600 dark:text-slate-400">
            Seja você um estabelecimento ou profissional, começar é fácil.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Establishments */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-white">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white">Para Estabelecimentos</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Restaurantes, bares, hotéis e eventos</p>
              </div>
            </div>
            <div className="space-y-6">
              {stepsEstablishment.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-semibold text-secondary dark:text-white">{item.title}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Freelancers */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-white">
                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </span>
              <div>
                <h3 className="text-xl font-bold text-secondary dark:text-white">Para Freelancers</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Garçons, barmen, cozinheiros e mais</p>
              </div>
            </div>
            <div className="space-y-6">
              {stepsFreelancer.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="font-semibold text-secondary dark:text-white">{item.title}</h4>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
