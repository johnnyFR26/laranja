'use client'

import { useCallback, useState } from 'react'
import {
  FreelancerDetailProfile,
  FreelancerDetailTabs,
  HireFreelancerPanel,
  HireBottomSheet,
} from '@/components/freelancer-detail'
import { MOCK_FREELANCER_SHIFTS } from '@/lib/freelancers-public-mock'
import type { FreelancerDetailData, ShiftOption } from '@/types/freelancer-detail'

export interface FreelancerDetailPageClientProps {
  /** Perfil resolvido no servidor (HTML inicial indexável, sem divergência na hidratação). */
  freelancer: FreelancerDetailData
  shifts?: ShiftOption[]
}

export function FreelancerDetailPageClient({
  freelancer,
  shifts = MOCK_FREELANCER_SHIFTS,
}: FreelancerDetailPageClientProps) {

  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(shifts[0]?.id ?? null)
  const [hireSheetOpen, setHireSheetOpen] = useState(false)

  const handleHireForShift = useCallback(() => {
    setHireSheetOpen(true)
  }, [])

  const handleInviteToRole = useCallback(() => {
    // TODO: navegar ou abrir fluxo "Invite to Role"
  }, [])

  const handleConfirmRequest = useCallback(() => {
    setHireSheetOpen(false)
  }, [])

  return (
    <>
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 p-6 lg:flex-row lg:px-8">
        <div className="flex flex-1 flex-col gap-6">
          <FreelancerDetailProfile
            freelancer={freelancer}
            onHireForShift={handleHireForShift}
            onInviteToRole={handleInviteToRole}
          />
          <FreelancerDetailTabs freelancer={freelancer} />
        </div>

        <aside className="hidden w-full flex-col lg:flex lg:w-96">
          <div className="sticky top-6 flex h-full max-h-[800px] flex-col overflow-hidden rounded-xl border-2 border-secondary/10 bg-white shadow-xl dark:bg-slate-900">
            <HireFreelancerPanel
              freelancerName={freelancer.name}
              shifts={shifts}
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

      <HireBottomSheet
        isOpen={hireSheetOpen}
        onClose={() => setHireSheetOpen(false)}
        freelancerName={freelancer.name}
        shifts={shifts}
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
