'use client'

import { useState } from 'react'
import type { FreelancerDetailData } from '@/types/freelancer-detail'

type TabId = 'expertise' | 'reviews' | 'portfolio'

const TABS: { id: TabId; label: string }[] = [
  { id: 'expertise', label: 'Expertise' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'portfolio', label: 'Portfolio' },
]

export interface FreelancerDetailTabsProps {
  freelancer: FreelancerDetailData
}

export function FreelancerDetailTabs({ freelancer }: FreelancerDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('expertise')
  const skills = freelancer.skills ?? []

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary bg-primary/5 text-primary'
                : 'text-slate-500 hover:text-secondary dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {activeTab === 'expertise' && (
          <>
            <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
              Cuisine Specialities
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium dark:bg-slate-800 dark:text-slate-200"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No specialities listed.
                </p>
              )}
            </div>
          </>
        )}
        {activeTab === 'reviews' && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reviews section — coming soon.
          </p>
        )}
        {activeTab === 'portfolio' && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Portfolio section — coming soon.
          </p>
        )}
      </div>
    </div>
  )
}
