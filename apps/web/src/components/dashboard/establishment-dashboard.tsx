'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { RequestHistoryCard } from '@/components/cards/request-history-card'
import type { RequestHistoryRow } from '@/components/cards/request-history-card'

const MOCK_REQUEST_HISTORY: RequestHistoryRow[] = [
  {
    id: '1',
    shiftName: 'Turno Noturno Sábado',
    shiftDate: '21 out 2023',
    shiftTime: '18:00 - 02:00',
    workerName: 'Amanda Lewis',
    workerAvatarUrl: null,
    status: 'completed',
    totalPaid: 'R$ 180,00',
  },
  {
    id: '2',
    shiftName: 'Suporte Brunch',
    shiftDate: '22 out 2023',
    shiftTime: '10:00 - 15:00',
    workerName: 'James Wilson',
    workerAvatarUrl: null,
    status: 'pending',
    totalPaid: 'R$ 112,50',
  },
  {
    id: '3',
    shiftName: 'Assistente de Cozinha Emergência',
    shiftDate: '19 out 2023',
    shiftTime: '17:00 - 23:00',
    workerName: 'Rosa Gomez',
    workerAvatarUrl: null,
    status: 'cancelled',
    totalPaid: 'R$ 0,00',
  },
  {
    id: '4',
    shiftName: 'Serviço de Jantar Extra',
    shiftDate: '18 out 2023',
    shiftTime: '19:00 - 00:00',
    workerName: 'Robert Pike',
    workerAvatarUrl: null,
    status: 'completed',
    totalPaid: 'R$ 125,00',
  },
]

export function EstablishmentDashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <header className="col-span-12">
        <DashboardHeader
          userName="Marco"
          subtitle="Aqui está o que aconteceu no seu estabelecimento hoje."
          balance="R$ 1.250,00"
          addCreditsHref="/payments/add"
        />
      </header>

      <section className="col-span-12">
        <RequestHistoryCard
          title="Histórico de solicitações"
          actionLabel="Ver todos os relatórios"
          rows={MOCK_REQUEST_HISTORY}
          actionHref="/reports"
        />
      </section>
    </div>
  )
}
