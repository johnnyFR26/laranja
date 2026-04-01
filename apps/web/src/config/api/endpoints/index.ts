/**
 * Map de endpoints por categoria (OpenAPI Grove Opportunities API).
 * Uso: endpoints.auth.login, endpoints.users.bySlug(slug), etc.
 * Seguro e escalável: um único lugar para paths, fácil adicionar novas categorias.
 */

import { authEndpoints } from './auth.endpoints'
import { healthEndpoints } from './health.endpoints'
import { usersEndpoints } from './users.endpoints'
import { categoriesEndpoints } from './categories.endpoints'
import { establishmentsEndpoints } from './establishments.endpoints'
import { serviceOffersEndpoints } from './service-offers.endpoints'
import { rolesEndpoints } from './roles.endpoints'
import { addressesEndpoints } from './addresses.endpoints'

export { authEndpoints } from './auth.endpoints'
export { healthEndpoints } from './health.endpoints'
export { usersEndpoints } from './users.endpoints'
export { categoriesEndpoints } from './categories.endpoints'
export { establishmentsEndpoints } from './establishments.endpoints'
export { serviceOffersEndpoints } from './service-offers.endpoints'
export { rolesEndpoints } from './roles.endpoints'
export { addressesEndpoints } from './addresses.endpoints'

/** Acesso aos endpoints por categoria */
export const endpoints = {
  auth: authEndpoints,
  health: healthEndpoints,
  users: usersEndpoints,
  categories: categoriesEndpoints,
  establishments: establishmentsEndpoints,
  serviceOffers: serviceOffersEndpoints,
  roles: rolesEndpoints,
  addresses: addressesEndpoints,
} as const
