'use client'

import { useRef } from 'react'
import { UrgentShiftCard } from '@/components/cards/urgent-shift-card'
import type { UrgentShiftCardData } from '@/components/cards/urgent-shift-card'

export interface UrgentShiftsCarouselProps {
  shifts: UrgentShiftCardData[]
}

export function UrgentShiftsCarousel({ shifts }: UrgentShiftsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const step = 300
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  if (shifts.length === 0) return null

  return (
    <section className="space-y-3" aria-label="Turnos urgentes - Expirando em breve">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          <span
            className="flex size-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            aria-hidden
          >
            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          Turnos urgentes – Expirando em breve
        </h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Anterior"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            aria-label="Próximo"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth scrollbar-thin"
        style={{ scrollbarWidth: 'thin' }}
      >
        {shifts.map((shift) => (
          <UrgentShiftCard key={shift.id} shift={shift} />
        ))}
      </div>
    </section>
  )
}
