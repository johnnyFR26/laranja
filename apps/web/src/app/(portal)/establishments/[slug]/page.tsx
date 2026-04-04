import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEstablishmentPublicDetail } from '@/lib/fetch-establishments-server'

interface EstablishmentPublicPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EstablishmentPublicPageProps): Promise<Metadata> {
  const { slug } = await params
  const establishment = await getEstablishmentPublicDetail(slug)
  if (!establishment)
    return { title: 'Estabelecimento não encontrado | Grove Opportunities' }

  const title = `${establishment.name} | Grove Opportunities`
  const description =
    establishment.description?.slice(0, 160) ??
    `Perfil de ${establishment.name} na Grove Opportunities — ofertas de serviço e hospitalidade.`

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function EstablishmentPublicPage({ params }: EstablishmentPublicPageProps) {
  const { slug } = await params
  const establishment = await getEstablishmentPublicDetail(slug)
  if (!establishment) notFound()

  const offers = establishment.serviceOffers ?? []
  const city = establishment.address?.city

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-secondary dark:text-slate-100">{establishment.name}</h1>
        {city ? (
          <p className="text-slate-500 dark:text-slate-400">{city}</p>
        ) : null}
        {establishment.description ? (
          <p className="text-slate-600 dark:text-slate-300">{establishment.description}</p>
        ) : null}
      </header>

      <section aria-labelledby="offers-heading">
        <h2 id="offers-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-slate-100">
          Ofertas de serviço
        </h2>
        {offers.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">Nenhuma oferta listada neste momento.</p>
        ) : (
          <ul className="space-y-3">
            {offers.map((offer) => {
              if (!offer.slug) return null
              return (
                <li key={offer.slug}>
                  <Link
                    href={`/jobs/${offer.slug}`}
                    className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-primary hover:underline dark:border-slate-700 dark:bg-slate-900"
                  >
                    {offer.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </article>
  )
}
