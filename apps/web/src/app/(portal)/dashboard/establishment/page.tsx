import { EstablishmentDashboard } from '@/components/dashboard/establishment-dashboard'
import { DashboardRoleGuard } from '@/components/dashboard/dashboard-role-guard'

export const metadata = {
  title: 'Dashboard Estabelecimento - Grove Opportunities',
  description: 'Histórico de profissionais que trabalharam no seu estabelecimento.',
}

export default function DashboardEstablishmentPage() {
  return (
    <DashboardRoleGuard mode="establishment-only">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EstablishmentDashboard />
      </div>
    </DashboardRoleGuard>
  )
}
