'use client'

import { useState } from 'react'
import type { ShiftOption } from '@/types/freelancer-detail'

export interface HireFreelancerPanelProps {
  freelancerName: string
  shifts: ShiftOption[]
  selectedShiftId: string | null
  onSelectShift: (id: string) => void
  onClose?: () => void
  estimatedHours?: number
  estimatedTotal?: string
  onConfirm: () => void
  onViewAllShifts?: () => void
  onCreateNewShift?: () => void
  /** Quando true, esconde o botão de fechar (ex.: painel lateral desktop) */
  showCloseButton?: boolean
}

export function HireFreelancerPanel({
  freelancerName,
  shifts,
  selectedShiftId,
  onSelectShift,
  onClose,
  estimatedHours = 6,
  estimatedTotal = '$270.00',
  onConfirm,
  onViewAllShifts,
  onCreateNewShift,
  showCloseButton = true,
}: HireFreelancerPanelProps) {
  const [search, setSearch] = useState('')

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-secondary p-6 text-white">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-bold">Hire {freelancerName}</h2>
          {showCloseButton && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-white/70 transition-colors hover:text-white"
              aria-label="Fechar"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-sm text-slate-300">
          Select an open shift or create a new one to invite this freelancer.
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
            aria-hidden
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders or shifts..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none transition-all focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Recent Shifts
            </h3>
            {onViewAllShifts && (
              <button
                type="button"
                onClick={onViewAllShifts}
                className="text-xs font-bold text-primary hover:underline"
              >
                View All
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {shifts.map((shift) => {
              const isSelected = selectedShiftId === shift.id
              return (
                <button
                  key={shift.id}
                  type="button"
                  onClick={() => onSelectShift(shift.id)}
                  className={`group w-full rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}
                    >
                      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900 dark:text-white">
                        {shift.title}
                      </p>
                      <p className="text-xs text-slate-500">{shift.subtitle}</p>
                    </div>
                    {isSelected ? (
                      <svg
                        className="size-6 shrink-0 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    ) : (
                      <svg
                        className="size-5 shrink-0 text-slate-300 transition-colors group-hover:text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {onCreateNewShift && (
            <button
              type="button"
              onClick={onCreateNewShift}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 py-3 font-bold text-slate-500 transition-all hover:border-primary hover:text-primary dark:border-slate-600"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Shift
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/80">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Estimated Total ({estimatedHours} hrs)
          </span>
          <span className="text-xl font-bold text-slate-900 dark:text-white">{estimatedTotal}</span>
        </div>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        >
          Confirm & Send Request
        </button>
      </div>
    </div>
  )
}
