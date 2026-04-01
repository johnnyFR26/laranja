/**
 * Endpoints de ofertas de serviço (OpenAPI: /api/service-offers/*).
 * Oferta identificada por slug UUID.
 */

const SERVICE_OFFERS = '/service-offers' as const

export const serviceOffersEndpoints = {
  list: SERVICE_OFFERS,
  create: SERVICE_OFFERS,
  open: `${SERVICE_OFFERS}/open`,
  bySlug: (slug: string) => `${SERVICE_OFFERS}/${slug}` as const,
  byEstablishmentSlug: (establishmentSlug: string) =>
    `${SERVICE_OFFERS}/establishment/${establishmentSlug}` as const,
  byCategorySlug: (categorySlug: string) =>
    `${SERVICE_OFFERS}/category/${categorySlug}` as const,
  status: (slug: string) => `${SERVICE_OFFERS}/${slug}/status` as const,
} as const
