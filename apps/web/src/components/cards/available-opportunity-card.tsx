'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface AvailableOpportunityCardData {
  /** Slug UUID da oferta (URL /jobs/:slug) */
  slug: string
  venueName: string
  location: string
  role: string
  pay: string
  payUnit: string
  dateLabel: string
  imageUrl?: string | null
}

export interface AvailableOpportunityCardProps {
  opportunity: AvailableOpportunityCardData
}

export function AvailableOpportunityCard({ opportunity }: AvailableOpportunityCardProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const imageUrl = opportunity.imageUrl ?? null

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
      data-testid="available-opportunity-card"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-200 dark:bg-slate-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <div
            className="size-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700"
            aria-hidden
          />
        )}
        <button
          type="button"
          onClick={() => setBookmarked((b) => !b)}
          className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm transition-colors hover:bg-white dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label={bookmarked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <svg
            className={`size-5 ${bookmarked ? 'fill-primary text-primary' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {opportunity.venueName}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{opportunity.location}</p>
        <p className="mt-1 text-sm font-medium text-primary">{opportunity.role}</p>
        <p className="mt-2 font-bold text-slate-900 dark:text-slate-100">
          {opportunity.pay}
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
            /{opportunity.payUnit}
          </span>
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{opportunity.dateLabel}</p>
        <Link
          href={`/jobs/${opportunity.slug}`}
          className="mt-4 flex w-full items-center justify-center rounded-lg border-2 border-primary bg-transparent px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary-light"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  )
}
