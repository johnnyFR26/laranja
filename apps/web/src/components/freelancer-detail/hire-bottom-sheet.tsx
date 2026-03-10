'use client'

import { useEffect } from 'react'
import { HireFreelancerPanel } from './hire-freelancer-panel'
import type { ShiftOption } from '@/types/freelancer-detail'

export interface HireBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  freelancerName: string
  shifts: ShiftOption[]
  selectedShiftId: string | null
  onSelectShift: (id: string) => void
  estimatedHours?: number
  estimatedTotal?: string
  onConfirm: () => void
  onViewAllShifts?: () => void
  onCreateNewShift?: () => void
}

export function HireBottomSheet({
  isOpen,
  onClose,
  freelancerName,
  shifts,
  selectedShiftId,
  onSelectShift,
  estimatedHours,
  estimatedTotal,
  onConfirm,
  onViewAllShifts,
  onCreateNewShift,
}: HireBottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
        aria-label="Fechar"
      />
      <div
        className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white shadow-xl dark:bg-slate-900 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Contratar freelancer"
      >
        <div className="flex h-full max-h-[85vh] flex-col">
          <HireFreelancerPanel
            freelancerName={freelancerName}
            shifts={shifts}
            selectedShiftId={selectedShiftId}
            onSelectShift={onSelectShift}
            onClose={onClose}
            estimatedHours={estimatedHours}
            estimatedTotal={estimatedTotal}
            onConfirm={handleConfirm}
            onViewAllShifts={onViewAllShifts}
            onCreateNewShift={onCreateNewShift}
            showCloseButton={true}
          />
        </div>
      </div>
    </>
  )
}
