/** Resposta JSON do ViaCEP (https://viacep.com.br/) */
export interface ViaCepJson {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

/**
 * Consulta endereço pelo CEP (apenas dígitos; 8 caracteres).
 * Retorna `null` se CEP inválido ou não encontrado.
 */
export async function fetchViaCep(cepRaw: string): Promise<ViaCepJson | null> {
  const digits = cepRaw.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
  if (!res.ok) return null
  const data = (await res.json()) as ViaCepJson
  if (data.erro) return null
  return data
}

export function formatCepFromDigits(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 5) return d
  return `${d.slice(0, 5)}-${d.slice(5)}`
}
