import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { Stats } from '@/components/landing/stats'
import { Features } from '@/components/landing/features'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Testimonials } from '@/components/landing/testimonials'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'

export const metadata = {
  title: 'Grove Opportunities - Conectando Talentos à oportunidades',
  description: 'A plataforma que conecta estabelecimentos aos melhores profissionais freelancers. Encontre turnos, contrate talentos, cresça seu negócio.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
