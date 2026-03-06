/**
 * Padrão de retorno da API Grove Opportunities.
 * Todas as respostas HTTP seguem: { data, statusCode, timestamp }.
 */

export interface ApiResponseDto<T> {
  /** Payload da resposta */
  data: T
  /** Código HTTP (ex.: 200, 201) */
  statusCode: number
  /** ISO 8601 */
  timestamp: string
}
