'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { DashboardHeader } from '@/components/dashboard-header'
import { FreelancerProfileCards } from '@/components/dashboard/freelancer-profile-cards'
import { AddressSideDrawer } from '@/components/address/address-side-drawer'
import { MyServicesCard } from '@/components/cards/my-services-card'
import type { MyServicesRow } from '@/components/cards/my-services-card'

const MOCK_MY_SERVICES: MyServicesRow[] = [
  {
    id: '1',
    serviceName: 'Turno Noturno Sábado',
    serviceDate: '21 out 2023',
    serviceTime: '18:00 - 02:00',
    establishmentName: 'Restaurante Bella Vista',
    establishmentLogoUrl: null,
    status: 'completed',
    totalPaid: 'R$ 180,00',
  },
  {
    id: '2',
    serviceName: 'Suporte Brunch',
    serviceDate: '22 out 2023',
    serviceTime: '10:00 - 15:00',
    establishmentName: 'Café Central',
    establishmentLogoUrl: null,
    status: 'pending',
    totalPaid: 'R$ 112,50',
  },
  {
    id: '3',
    serviceName: 'Assistente de Cozinha Emergência',
    serviceDate: '19 out 2023',
    serviceTime: '17:00 - 23:00',
    establishmentName: 'Hotel Sunset',
    establishmentLogoUrl: null,
    status: 'cancelled',
    totalPaid: 'R$ 0,00',
  },
  {
    id: '4',
    serviceName: 'Serviço de Jantar Extra',
    serviceDate: '18 out 2023',
    serviceTime: '19:00 - 00:00',
    establishmentName: 'Restaurante Bella Vista',
    establishmentLogoUrl: null,
    status: 'completed',
    totalPaid: 'R$ 125,00',
  },
]

export function FreelancerDashboard() {
  const { user } = useAuth()
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false)
  const userName = user?.name ?? user?.email ?? 'Usuário'
  const skills = (user?.controls as { skills?: string[] } | undefined)?.skills ?? []
  const displayAddress = user?.establishment?.address ?? user?.address ?? null

  return (
    <div className="grid grid-cols-12 gap-6">
      <header className="col-span-12">
        <DashboardHeader
          userName={userName}
          subtitle="Aqui estão os seus serviços e valores recebidos."
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

      <section className="col-span-12">
        <MyServicesCard
          title="Meus serviços"
          actionLabel="Ver todos os relatórios"
          rows={MOCK_MY_SERVICES}
          actionHref="/reports"
        />
      </section>
    </div>
  )
}
