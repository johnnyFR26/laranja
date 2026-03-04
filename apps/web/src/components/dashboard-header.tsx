import Link from 'next/link'

export interface DashboardHeaderProps {
  userName: string
  subtitle?: string
  balance?: string
  balanceLabel?: string
  addCreditsHref?: string
}

export function DashboardHeader({
  userName,
  subtitle = "Here's what's happening at your venue today.",
  balance,
  balanceLabel = 'CURRENT BALANCE',
  addCreditsHref = '#',
}: DashboardHeaderProps) {
  return (
    <header className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Welcome back, {userName}
        </h2>
        {subtitle && (
          <p className="mt-1 text-slate-500">{subtitle}</p>
        )}
      </div>
      {balance != null && (
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {balanceLabel}
            </span>
            <span className="text-2xl font-black tracking-tight text-secondary dark:text-primary">
              {balance}
            </span>
          </div>
          <Link
            href={addCreditsHref}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-bold text-white shadow-lg shadow-primary-glow transition-all hover:scale-105"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
            Add Credits
          </Link>
        </div>
      )}
    </header>
  )
}
