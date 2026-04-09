import { FreelancerDashboard } from '@/components/dashboard/freelancer-dashboard'
import { DashboardRoleGuard } from '@/components/dashboard/dashboard-role-guard'

export const metadata = {
  title: 'Dashboard Freelancer - Grove Opportunities',
  description: 'Seus serviços, estabelecimentos, status e valores recebidos.',
}

export default function DashboardFreelancerPage() {
  return (
    <DashboardRoleGuard mode="freelancer-only">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <FreelancerDashboard />
      </div>
    </DashboardRoleGuard>
  )
}
