'use client'

import { useState } from 'react'

const ROLE_TABS = [
  { id: 'all', label: 'All Talent' },
  { id: 'waiters', label: 'Waiters' },
  { id: 'kitchen', label: 'Kitchen Assistants' },
] as const

const MIN_PRICE = 15
const MAX_PRICE = 100

export function FreelancersFilters() {
  const [activeRole, setActiveRole] = useState<string>(ROLE_TABS[0].id)
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Role categories
        </p>
        <div className="flex flex-wrap gap-2">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveRole(tab.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeRole === tab.id
                  ? 'bg-primary text-white shadow-primary-glow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Price range
          </p>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            ${MIN_PRICE} - ${maxPrice}/hr
          </span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary"
            style={{
              width: `${((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
            }}
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="absolute left-0 top-1/2 size-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
          />
        </div>
      </div>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-secondary/90"
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        More Filters
      </button>
    </div>
  )
}
