/**
 * Base URL da API (OpenAPI: paths under /api).
 * Em produção use NEXT_PUBLIC_API_URL.
 * Ex.: https://grove-opportunities-api.vercel.app/api
 */
export const API_BASE_URL =
  typeof process.env.NEXT_PUBLIC_API_URL === 'string' && process.env.NEXT_PUBLIC_API_URL.length > 0
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
    : 'http://localhost:3001/api'

export const AUTH_TOKEN_KEY = 'grove_access_token'
export const REFRESH_TOKEN_KEY = 'grove_refresh_token'
