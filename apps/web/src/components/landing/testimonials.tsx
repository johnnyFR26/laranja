const testimonials = [
  {
    quote:
      'Desde que começamos a usar o Grove, conseguimos preencher turnos urgentes em questão de horas. A qualidade dos profissionais é excelente.',
    author: 'Mariana Silva',
    role: 'Gerente de Operações',
    company: 'Restaurante Vila Nova',
    avatar: 'MS',
  },
  {
    quote:
      'A flexibilidade é incrível. Consigo escolher os turnos que combinam com minha rotina e trabalhar com os melhores estabelecimentos da cidade.',
    author: 'Carlos Santos',
    role: 'Barman Freelancer',
    company: '5 anos de experiência',
    avatar: 'CS',
  },
  {
    quote:
      'Reduzimos em 60% o tempo gasto com contratações. O processo é simples e os profissionais já vêm com avaliações verificadas.',
    author: 'Ana Costa',
    role: 'Proprietária',
    company: 'Bar do Centro',
    avatar: 'AC',
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Depoimentos</p>
          <h2 className="mt-2 text-balance text-3xl font-black tracking-tight text-secondary sm:text-4xl dark:text-white">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-pretty text-lg text-slate-600 dark:text-slate-400">
            Histórias reais de estabelecimentos e profissionais que transformaram suas operações.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50"
            >
              {/* Quote Icon */}
              <svg
                className="absolute -top-3 left-6 size-8 text-primary/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <blockquote className="flex-1">
                <p className="text-slate-600 dark:text-slate-300">{`"${testimonial.quote}"`}</p>
              </blockquote>

              <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {testimonial.avatar}
                </span>
                <div>
                  <p className="font-semibold text-secondary dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
