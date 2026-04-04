import type { MetadataRoute } from 'next'
import { fetchAllEstablishmentSlugsForSitemap } from '@/lib/fetch-establishments-server'
import { getOpenServiceOffers } from '@/lib/fetch-open-service-offers-server'
import { PUBLIC_FREELANCER_MOCK_IDS } from '@/lib/freelancers-public-mock'
import { DEMO_JOB_DETAIL_SLUGS } from '@/lib/job-demo-slugs'
import { getSiteUrlString } from '@/lib/seo/site-url'

/** Regenerar mapa periodicamente em produção (ISR). */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrlString()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/jobs`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/freelancers`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/establishments`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
  ]

  const openOffers = await getOpenServiceOffers()
  const jobSlugSet = new Set<string>()
  for (const offer of openOffers) {
    if (offer.slug) jobSlugSet.add(offer.slug)
  }
  for (const slug of DEMO_JOB_DETAIL_SLUGS) jobSlugSet.add(slug)

  const jobEntries: MetadataRoute.Sitemap = [...jobSlugSet].map((slug) => ({
    url: `${base}/jobs/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const freelancerEntries: MetadataRoute.Sitemap = [...PUBLIC_FREELANCER_MOCK_IDS].map((id) => ({
    url: `${base}/freelancers/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const establishmentSlugs = await fetchAllEstablishmentSlugsForSitemap()
  const establishmentEntries: MetadataRoute.Sitemap = establishmentSlugs.map((slug) => ({
    url: `${base}/establishments/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.82,
  }))

  return [...staticEntries, ...jobEntries, ...freelancerEntries, ...establishmentEntries]
}
