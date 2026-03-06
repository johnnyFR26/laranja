/**
 * Cliente HTTP centralizado (axios).
 * Seguro e escalável: instância única, baseURL e Bearer injetados em um só lugar.
 * Respostas da API seguem o padrão { data, statusCode, timestamp }; o interceptor
 * desempacota e expõe apenas `data` em response.data.
 * @see https://medium.com/@vishweshshukla20/how-i-architected-a-scalable-production-ready-axios-http-client-for-modern-web-projects-f2f9ead9a1c5
 */

import axios, { type AxiosInstance } from 'axios'
import { API_BASE_URL, AUTH_TOKEN_KEY } from '@/config/api'

function getToken(): string | null {
  if (typeof sessionStorage === 'undefined') return null
  return sessionStorage.getItem(AUTH_TOKEN_KEY)
}

/** Verifica se o body é o padrão da API: { data, statusCode, timestamp } */
function isWrappedApiResponse(body: unknown): body is { data: unknown; statusCode: number; timestamp: string } {
  return (
    typeof body === 'object' &&
    body !== null &&
    'data' in body &&
    'statusCode' in body &&
    'timestamp' in body
  )
}

/** Instância axios com baseURL e interceptor que adiciona Bearer quando houver token. */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

/** Desempacota respostas no padrão da API: { data, statusCode, timestamp } → response.data = data */
apiClient.interceptors.response.use((response) => {
  if (isWrappedApiResponse(response.data)) {
    response.data = response.data.data
  }
  return response
}, (error) => Promise.reject(error))
