/**
 * Endpoints de health check (OpenAPI: /api/health).
 */

export const healthEndpoints = {
  /** GET - Health check → 200 | 503 */
  check: '/health',
} as const
