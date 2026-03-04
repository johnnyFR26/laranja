import { Sidebar } from '@/components/sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { StoreSpecialtyCard } from '@/components/cards/store-specialty-card'
import { ConfirmedFreelancersCard } from '@/components/cards/confirmed-freelancers-card'
import { RequestHistoryCard } from '@/components/cards/request-history-card'

const MOCK_USER = {
  name: 'Marco',
  establishmentName: 'La Trattoria Milano',
  avatarUrl: null,
}

const MOCK_SPECIALTIES = [
  {
    id: '1',
    label: 'Italian Cuisine',
    active: true,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
      </svg>
    ),
  },
  {
    id: '2',
    label: 'Craft Bar',
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: '3',
    label: 'Fine Dining',
    active: false,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

const MOCK_FREELANCERS = [
  { id: '1', name: 'Sarah Jenkins', role: 'Head Waiter', avatarUrl: null },
  { id: '2', name: 'Michael Chen', role: 'Kitchen Assistant', avatarUrl: null },
  { id: '3', name: 'David Smith', role: 'Mixologist', avatarUrl: null },
  { id: '4', name: 'Elena Rodriguez', role: 'Waiter', avatarUrl: null },
]

const MOCK_REQUEST_HISTORY = [
  {
    id: '1',
    shiftName: 'Saturday Night Shift',
    shiftDate: 'Oct 21, 2023',
    shiftTime: '18:00 - 02:00',
    workerName: 'Amanda Lewis',
    workerAvatarUrl: null,
    status: 'completed' as const,
    totalPaid: '$180.00',
  },
  {
    id: '2',
    shiftName: 'Brunch Support',
    shiftDate: 'Oct 22, 2023',
    shiftTime: '10:00 - 15:00',
    workerName: 'James Wilson',
    workerAvatarUrl: null,
    status: 'pending' as const,
    totalPaid: '$112.50',
  },
  {
    id: '3',
    shiftName: 'Kitchen Assistant Emergency',
    shiftDate: 'Oct 19, 2023',
    shiftTime: '17:00 - 23:00',
    workerName: 'Rosa Gomez',
    workerAvatarUrl: null,
    status: 'cancelled' as const,
    totalPaid: '$0.00',
  },
  {
    id: '4',
    shiftName: 'Dinner Service Extra',
    shiftDate: 'Oct 18, 2023',
    shiftTime: '19:00 - 00:00',
    workerName: 'Robert Pike',
    workerAvatarUrl: null,
    status: 'completed' as const,
    totalPaid: '$125.00',
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar user={MOCK_USER} currentPath="/dashboard" />

      <main className="flex-1 overflow-auto p-4 pl-14 pt-14 md:ml-64 md:p-8">
        <div className="grid grid-cols-12 gap-6">
          <header className="col-span-12">
            <DashboardHeader
              userName={MOCK_USER.name}
              balance="$1,250.00"
              addCreditsHref="/payments/add"
            />
          </header>

          <section className="col-span-12 lg:col-span-5">
            <StoreSpecialtyCard
              tags={MOCK_SPECIALTIES}
              actionHref="/settings/specialties"
            />
          </section>

          <section className="col-span-12 lg:col-span-7">
            <ConfirmedFreelancersCard freelancers={MOCK_FREELANCERS} />
          </section>

          <section className="col-span-12">
            <RequestHistoryCard rows={MOCK_REQUEST_HISTORY} actionHref="/reports" />
          </section>
        </div>
      </main>
    </div>
  )
}
