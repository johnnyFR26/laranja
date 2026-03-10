'use client'

import type { FreelancerDetailData } from '@/types/freelancer-detail'

export interface FreelancerDetailProfileProps {
  freelancer: FreelancerDetailData
  onHireForShift: () => void
  onInviteToRole: () => void
}

export function FreelancerDetailProfile({
  freelancer,
  onHireForShift,
  onInviteToRole,
}: FreelancerDetailProfileProps) {
  const hasImage = Boolean(freelancer.avatarUrl)

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="relative shrink-0">
          {hasImage ? (
            <img
              src={freelancer.avatarUrl!}
              alt=""
              className="size-32 rounded-full border-4 border-primary/20 object-cover"
            />
          ) : (
            <div
              className="flex size-32 items-center justify-center rounded-full border-4 border-primary/20 bg-gradient-to-br from-slate-300 to-slate-400 text-3xl font-bold text-white dark:from-slate-600 dark:to-slate-700"
              aria-hidden
            >
              {freelancer.name.charAt(0)}
            </div>
          )}
          {freelancer.online && (
            <span
              className="absolute bottom-1 right-1 size-5 rounded-full border-4 border-white bg-green-500 dark:border-slate-900"
              aria-hidden
            />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {freelancer.name}
            </h1>
            {freelancer.verified && (
              <span className="inline-flex w-fit items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary dark:bg-secondary/30 dark:text-blue-300">
                Verified Pro
              </span>
            )}
          </div>
          <p className="mb-1 text-lg text-slate-600 dark:text-slate-400">
            {freelancer.specialty} • {freelancer.experienceYears} years exp.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 dark:text-slate-400 md:justify-start">
            {freelancer.rating != null && freelancer.reviewCount != null && (
              <span className="flex items-center gap-1 font-semibold text-primary">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {freelancer.rating} ({freelancer.reviewCount} reviews)
              </span>
            )}
            <span>{freelancer.pricePerHour}/hr</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {freelancer.successRate != null && (
          <div className="flex flex-col items-center rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
            <span className="text-2xl font-bold text-secondary">{freelancer.successRate}%</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Success
            </span>
          </div>
        )}
        {freelancer.totalShifts != null && (
          <div className="flex flex-col items-center rounded-lg border-x border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
            <span className="text-2xl font-bold text-secondary">{freelancer.totalShifts}+</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Shifts
            </span>
          </div>
        )}
        {freelancer.repeatBookings != null && (
          <div className="flex flex-col items-center rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
            <span className="text-2xl font-bold text-secondary">{freelancer.repeatBookings}</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Repeats
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onHireForShift}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
        >
          <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M11 21h-1l-1-7H6.92c-.58 0-1.1-.4-1.27-.97L4.5 3H2V1h2.5c.83 0 1.57.5 1.89 1.2l.66 1.6c.24.58.8 1 1.44 1h9.02c.64 0 1.2-.42 1.44-1l.66-1.6C19.93 1.5 20.67 1 21.5 1H24v2h-2.5l-1.25 6.03c-.17.57-.69.97-1.27.97H13l-1 7z" />
          </svg>
          Hire for Shift
        </button>
        <button
          type="button"
          onClick={onInviteToRole}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-4 text-lg font-bold text-white transition-all hover:bg-secondary/90"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Invite to Role
        </button>
      </div>
    </div>
  )
}
