const stats = [
  { value: '500+', label: 'Estabelecimentos', description: 'parceiros ativos' },
  { value: '10k+', label: 'Profissionais', description: 'cadastrados' },
  { value: '98%', label: 'Satisfação', description: 'dos clientes' },
  { value: '24h', label: 'Resposta', description: 'tempo médio' },
]

export function Stats() {
  return (
    <section className="border-y border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-black text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-secondary dark:text-white">{stat.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
