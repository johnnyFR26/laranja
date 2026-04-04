import Link from 'next/link'
import { getEstablishmentsPage } from '@/lib/fetch-establishments-server'

export const metadata = {
  title: 'Estabelecimentos | Grove Opportunities',
  description:
    'Restaurantes, hotéis e espaços de hospitalidade na Grove Opportunities. Veja perfis públicos e ofertas de serviço.',
}

export default async function EstablishmentsDirectoryPage() {
  const result = await getEstablishmentsPage(1, 48)
  const establishments = result?.data ?? []

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Estabelecimentos</h1>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Perfis públicos de estabelecimentos e as respetivas oportunidades.
        </p>
      </header>

      {establishments.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400" role="status">
          Ainda não há estabelecimentos listados ou a API não está disponível.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {establishments.map((est) => (
            <li key={est.slug}>
              <Link
                href={`/establishments/${est.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <h2 className="font-semibold text-secondary dark:text-slate-100">{est.name}</h2>
                {est.description ? (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {est.description}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
