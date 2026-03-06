/**
 * Endpoints de ofertas de serviço (OpenAPI: /api/service-offers/*).
 */

const SERVICE_OFFERS = '/service-offers' as const

export const serviceOffersEndpoints = {
  list: SERVICE_OFFERS,
  create: SERVICE_OFFERS,
  open: `${SERVICE_OFFERS}/open`,
  byId: (id: string) => `${SERVICE_OFFERS}/${id}` as const,
  byEstablishment: (establishmentId: string) =>
    `${SERVICE_OFFERS}/establishment/${establishmentId}` as const,
  byCategory: (categoryId: string) =>
    `${SERVICE_OFFERS}/category/${categoryId}` as const,
  status: (id: string) => `${SERVICE_OFFERS}/${id}/status` as const,
} as const
