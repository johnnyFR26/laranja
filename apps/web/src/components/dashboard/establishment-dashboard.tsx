'use client'

import { useState } from 'react'
import type { ServiceOfferOpenApiDto } from '@org/types'
import { useAuth } from '@/hooks/use-auth'
import { useEstablishmentServiceOffers } from '@/hooks/use-service-offers'
import { DashboardHeader } from '@/components/dashboard-header'
import { FreelancerProfileCards } from '@/components/dashboard/freelancer-profile-cards'
import { AddressSideDrawer } from '@/components/address/address-side-drawer'
import { EstablishmentExpiringOffersCarousel } from '@/components/dashboard/establishment-expiring-offers-carousel'
import { EstablishmentServiceOffersTable } from '@/components/dashboard/establishment-service-offers-table'

/**
 * Mock alinhado ao formato ServiceOfferOpenApiDto.
 * Usado como fallback visual enquanto o estabelecimento não tem slug confirmado
 * ou durante desenvolvimento sem API.
 * Dois itens têm deadline = hoje para exercitar o carrossel de "expira hoje".
 */
const today = new Date().toISOString()
const tomorrow = new Date(Date.now() + 86_400_000).toISOString()
const yesterday = new Date(Date.now() - 86_400_000).toISOString()

const MOCK_SERVICE_OFFERS: ServiceOfferOpenApiDto[] = [
  {
    id: 1,
    slug: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Turno Noturno Sábado',
    description: 'Profissional para cobrir turno noturno de sábado no salão.',
    budget: 180,
    budgetType: 'FIXED',
    status: 'OPEN',
    deadline: today,
    createdAt: '2023-10-21T00:00:00Z',
    establishment: { name: 'Meu Estabelecimento' },
    category: { name: 'Gastronomia' },
  },
  {
    id: 2,
    slug: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Suporte Brunch',
    description: 'Apoio durante o serviço de brunch dominical.',
    budget: 112.5,
    budgetType: 'HOURLY',
    status: 'IN_PROGRESS',
    deadline: today,
    createdAt: '2023-10-22T00:00:00Z',
    establishment: { name: 'Meu Estabelecimento' },
    category: null,
  },
  {
    id: 3,
    slug: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Assistente de Cozinha Emergência',
    description: 'Auxiliar de cozinha para cobertura emergencial.',
    budget: null,
    budgetType: 'NEGOTIABLE',
    status: 'CANCELLED',
    deadline: yesterday,
    createdAt: '2023-10-19T00:00:00Z',
    establishment: { name: 'Meu Estabelecimento' },
    category: { name: 'Cozinha' },
  },
  {
    id: 4,
    slug: '550e8400-e29b-41d4-a716-446655440004',
    title: 'Serviço de Jantar Extra',
    description: 'Garçom para jantar especial com menu degustação.',
    budget: 125,
    budgetType: 'FIXED',
    status: 'COMPLETED',
    deadline: tomorrow,
    createdAt: '2023-10-18T00:00:00Z',
    establishment: { name: 'Meu Estabelecimento' },
    category: { name: 'Serviços' },
  },
]

export function EstablishmentDashboard() {
  const { user } = useAuth()
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false)

  const userName = user?.name ?? user?.email ?? 'Usuário'
  const establishmentName = user?.establishment?.name
  const establishmentSlug = user?.establishment?.slug ?? null
  const skills = (user?.controls as { skills?: string[] } | undefined)?.skills ?? []
  const displayAddress = user?.establishment?.address ?? user?.address ?? null

  /**
   * Hook busca GET /api/service-offers/establishment/:establishmentSlug.
   * Usa slug UUID do estabelecimento (nunca id numérico).
   * Enquanto não houver slug (usuário sem estabelecimento ou token não hidratado),
   * o hook retorna isLoading=false e offers=[].
   */
  const {
    offers: apiOffers,
    isLoading,
    error,
  } = useEstablishmentServiceOffers(establishmentSlug)

  /**
   * Quando o estabelecimento existe mas ainda não há serviços reais (lista vazia após carregamento),
   * exibe o mock para demonstrar o layout. Em produção, pode-se remover o fallback ou mantê-lo
   * apenas em ambiente de desenvolvimento.
   */
  const offers: ServiceOfferOpenApiDto[] =
    !isLoading && apiOffers.length === 0 && !error && !establishmentSlug
      ? MOCK_SERVICE_OFFERS
      : apiOffers

  return (
    <div className="grid grid-cols-12 gap-6">
      <header className="col-span-12">
        <DashboardHeader
          userName={userName}
          subtitle={
            establishmentName
              ? `${establishmentName} — aqui está o que aconteceu no seu estabelecimento hoje.`
              : 'Aqui está o que aconteceu no seu estabelecimento hoje.'
          }
          balance="R$ 1.250,00"
          addCreditsHref="/payments/add"
        />
      </header>

      <section className="col-span-12">
        <FreelancerProfileCards
          userName={userName}
          avatarUrl={user?.avatarUrl}
          address={displayAddress}
          skills={skills}
          balance="R$ 0,00"
          onConfigureAddress={() => setAddressDrawerOpen(true)}
        />
      </section>

      <AddressSideDrawer open={addressDrawerOpen} onClose={() => setAddressDrawerOpen(false)} />

      {/* Carrossel: serviços que expiram hoje — só renderiza se houver pelo menos 1 */}
      <section className="col-span-12">
        <EstablishmentExpiringOffersCarousel offers={isLoading ? [] : offers} />
      </section>

      {/* Tabela principal de serviços do estabelecimento */}
      <section className="col-span-12">
        <EstablishmentServiceOffersTable
          offers={offers}
          isLoading={isLoading}
          actionLabel="Publicar nova vaga"
          actionHref="/dashboard/establishment/new-shift"
        />
      </section>
    </div>
  )
}
