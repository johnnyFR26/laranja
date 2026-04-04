/**
 * URL canónica do site (OG, sitemap, robots).
 * Definir NEXT_PUBLIC_SITE_URL em produção (ex.: https://www.groveopportunities.com).
 */
export function getSiteUrl(): URL {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')
  if (env) {
    const withProto = env.startsWith('http') ? env : `https://${env}`
    return new URL(withProto)
  }
  if (process.env.VERCEL_URL)
    return new URL(`https://${process.env.VERCEL_URL.replace(/\/$/, '')}`)
  return new URL('http://localhost:4200')
}

export function getSiteUrlString(): string {
  return getSiteUrl().origin
}
