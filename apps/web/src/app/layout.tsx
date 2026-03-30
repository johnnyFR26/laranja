import './global.css'
import { Providers } from '@/components/providers'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://groveopportunities.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Grove Opportunities - Conectando Talentos à Hospitalidade',
    template: '%s | Grove Opportunities',
  },
  description: 'A plataforma que conecta estabelecimentos de hospitalidade aos melhores profissionais freelancers. Encontre turnos, contrate talentos, cresça seu negócio.',
  keywords: [
    'freelancer',
    'hospitalidade',
    'turnos',
    'vagas',
    'restaurantes',
    'garçom',
    'cozinheiro',
    'bartender',
    'trabalho temporário',
    'oportunidades',
    'emprego',
    'serviços',
  ],
  authors: [{ name: 'Grove Opportunities' }],
  creator: 'Grove Opportunities',
  publisher: 'Grove Opportunities',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Grove Opportunities',
    title: 'Grove Opportunities - Conectando Talentos à Hospitalidade',
    description: 'A plataforma que conecta estabelecimentos de hospitalidade aos melhores profissionais freelancers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grove Opportunities - Conectando Talentos à Hospitalidade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grove Opportunities - Conectando Talentos à Hospitalidade',
    description: 'A plataforma que conecta estabelecimentos de hospitalidade aos melhores profissionais freelancers.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Adicionar verificação do Google Search Console
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
