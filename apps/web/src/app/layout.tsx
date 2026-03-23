import './global.css'
import { Providers } from '@/components/providers'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Grove Opportunities - Conectando Talentos à Hospitalidade',
  description: 'A plataforma que conecta estabelecimentos de hospitalidade aos melhores profissionais freelancers. Encontre turnos, contrate talentos, cresça seu negócio.',
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
