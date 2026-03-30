import type { MetadataRoute } from 'next'

// TODO: Substituir pela URL real do site em produção
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://groveopportunities.com'

// Mock IDs - em produção, buscar do banco de dados
const MOCK_FREELANCER_IDS = ['1', '2', '3', '4', '5', '6']
const MOCK_JOB_IDS = ['a1', 'a2', 'a3', 'a4']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas principais
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/freelancers`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/register/freelancer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/register/establishment`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Páginas dinâmicas de freelancers
  // TODO: Em produção, buscar IDs do banco de dados
  const freelancerPages: MetadataRoute.Sitemap = MOCK_FREELANCER_IDS.map((id) => ({
    url: `${BASE_URL}/freelancers/${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Páginas dinâmicas de vagas/jobs
  // TODO: Em produção, buscar IDs do banco de dados
  const jobPages: MetadataRoute.Sitemap = MOCK_JOB_IDS.map((id) => ({
    url: `${BASE_URL}/jobs/${id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...freelancerPages, ...jobPages]
}
