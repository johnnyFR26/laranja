'use client'

import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import {
  FreelancerDetailProfile,
  FreelancerDetailTabs,
  HireFreelancerPanel,
  HireBottomSheet,
} from '@/components/freelancer-detail'
import type { FreelancerDetailData, ShiftOption } from '@/types/freelancer-detail'

const MOCK_FREELANCERS: Record<string, FreelancerDetailData> = {
  '1': {
    id: '1',
    name: 'Marcus Chen',
    role: 'Waiter',
    specialty: 'Professional Waiter',
    experienceYears: 5,
    pricePerHour: '$32',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCprf9UlootX5M39HuYEL413fj8v_p0L6IPLpEEEP19oDeuQJy7kbHcH9YdiF10j868TybChE98paXjMrP9jllZz43ujeyYqitDyaKSBEEhrVZkX5ciLERN6wGrWJQzEKhxSve5StmfNmPJuiz5gcDg1xf3jMt6STAThHrn_wyNekqOgU7_RZz6K5pm9NwVFDwo9It0KtLBh11U7u0Mg6YRRvW2qAy8_p3eupSd8n3nKsSWm2k4t3qd6CW0YycgGaZo4ZD_jaf6Tk0',
    verified: true,
    rating: 4.9,
    reviewCount: 128,
    successRate: 98,
    totalShifts: 150,
    repeatBookings: 12,
    skills: ['French Fine Dining', 'Italian Modern', 'Pastry Arts', 'Molecular Gastronomy'],
    online: true,
  },
  '2': {
    id: '2',
    name: 'Elena Rodriguez',
    role: 'Kitchen Assistant',
    specialty: 'Kitchen Assistant • Pastry Specialist',
    experienceYears: 4,
    pricePerHour: '$28',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN2NlvZmXltkcRuA15qVORiINBjYnGw63Z3c8RcI8kGy3wtS0KISZcdMNR-ehfjzN1KJncFjsXS5PdGnlpk0QFG8at6OZk41l9E-Q9tGbXHq6fM-f8YNkb_DYZ_KQHCg3YjOQuw4VXsgMlEVoDjZE7EorEvtmUiiDFDLhQ-SLzEN3ypKufdAAmtYWeya-q0oBlPuHp4PaAoNIO7nRgureQCo0Xp94gS51-LuuHd_B51qj4WA6DlnBZJCB6F9Hdw1vL7KhUa0IB8p4',
    verified: true,
    rating: 4.8,
    reviewCount: 86,
    successRate: 97,
    totalShifts: 120,
    repeatBookings: 8,
    skills: ['Pastry Arts', 'Food Preparation', 'Deep Cleaning Protocol'],
    online: false,
  },
}

const MOCK_SHIFTS: ShiftOption[] = [
  { id: 's1', title: 'Head Line Cook', subtitle: 'Tonight, 5:00 PM - 11:00 PM' },
  { id: 's2', title: 'Grill Station Expert', subtitle: 'Friday, Oct 24 • Dinner' },
  { id: 's3', title: 'Sous Chef (Prep)', subtitle: 'Saturday, Oct 25 • All Day' },
]

const DEFAULT_FREELANCER: FreelancerDetailData = {
  id: 'unknown',
  name: 'Alex Rivera',
  role: 'Executive Chef',
  specialty: 'Executive Chef',
  experienceYears: 12,
  pricePerHour: '$45',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCfMrlDGgS_CuXomLTq1sJOYf40o_HmdqzG2C9tpQz9E9kPXxuPLpcSdll1U3_A65mDrzG8ZT7kJ8JxjXBSAt9s-4hO004a1wXNscr9ACACL7YsBW2090ZFna1JreAGIvWkUQ0MTxtXronfT2Q3E0T7YLY2eFwOkRmJhHCOq0-QchjObiIUf45e4gqBQcq_ZwPJop5dSr7MS3L00LOesIoZ9u9Zkon6WwVAiwuosi6MpqgV_FW2oI7M5niamcjInZeEv09sE3curPo',
  verified: true,
  rating: 4.9,
  reviewCount: 128,
  successRate: 98,
  totalShifts: 150,
  repeatBookings: 12,
  skills: ['French Fine Dining', 'Italian Modern', 'Pastry Arts', 'Molecular Gastronomy'],
  online: true,
}

export default function FreelancerDetailPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : ''
  const freelancer = id ? MOCK_FREELANCERS[id] ?? { ...DEFAULT_FREELANCER, id, name: 'Freelancer' } : DEFAULT_FREELANCER

  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(MOCK_SHIFTS[0]?.id ?? null)
  const [hireSheetOpen, setHireSheetOpen] = useState(false)

  const handleHireForShift = useCallback(() => {
    setHireSheetOpen(true)
  }, [])

  const handleInviteToRole = useCallback(() => {
    // TODO: navegar ou abrir fluxo "Invite to Role"
  }, [])

  const handleConfirmRequest = useCallback(() => {
    // TODO: enviar proposta à API
    setHireSheetOpen(false)
  }, [])

  return (
    <>
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 p-6 lg:flex-row lg:px-8">
        {/* Left: Profile + Tabs */}
        <div className="flex flex-1 flex-col gap-6">
          <FreelancerDetailProfile
            freelancer={freelancer}
            onHireForShift={handleHireForShift}
            onInviteToRole={handleInviteToRole}
          />
          <FreelancerDetailTabs freelancer={freelancer} />
        </div>

        {/* Right: Hire panel (desktop only) */}
        <aside className="hidden w-full flex-col lg:flex lg:w-96">
          <div className="sticky top-6 flex h-full max-h-[800px] flex-col overflow-hidden rounded-xl border-2 border-secondary/10 bg-white shadow-xl dark:bg-slate-900">
            <HireFreelancerPanel
              freelancerName={freelancer.name}
              shifts={MOCK_SHIFTS}
              selectedShiftId={selectedShiftId}
              onSelectShift={setSelectedShiftId}
              estimatedHours={6}
              estimatedTotal="$270.00"
              onConfirm={handleConfirmRequest}
              onViewAllShifts={() => {}}
              onCreateNewShift={() => {}}
              showCloseButton={false}
            />
          </div>
        </aside>
      </main>

      {/* Mobile: Bottom sheet */}
      <HireBottomSheet
        isOpen={hireSheetOpen}
        onClose={() => setHireSheetOpen(false)}
        freelancerName={freelancer.name}
        shifts={MOCK_SHIFTS}
        selectedShiftId={selectedShiftId}
        onSelectShift={setSelectedShiftId}
        estimatedHours={6}
        estimatedTotal="$270.00"
        onConfirm={handleConfirmRequest}
        onViewAllShifts={() => {}}
        onCreateNewShift={() => {}}
      />
    </>
  )
}
