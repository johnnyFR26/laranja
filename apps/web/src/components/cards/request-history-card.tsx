import Link from 'next/link'
import Image from 'next/image'

export type RequestStatus = 'completed' | 'pending' | 'cancelled'

export interface RequestHistoryRow {
  id: string
  shiftName: string
  shiftDate: string
  shiftTime: string
  workerName: string
  workerAvatarUrl?: string | null
  status: RequestStatus
  totalPaid: string
}

export interface RequestHistoryCardProps {
  title?: string
  actionLabel?: string
  actionHref?: string
  rows: RequestHistoryRow[]
}

const DEFAULT_TITLE = 'Request History'
const DEFAULT_ACTION_LABEL = 'View All Reports'

const STATUS_STYLES: Record<
  RequestStatus,
  { className: string; label: string }
> = {
  completed: {
    className: 'rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700',
    label: 'Completed',
  },
  pending: {
    className: 'rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700',
    label: 'Pending',
  },
  cancelled: {
    className: 'rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700',
    label: 'Cancelled',
  },
}

export function RequestHistoryCard({
  title = DEFAULT_TITLE,
  actionLabel = DEFAULT_ACTION_LABEL,
  actionHref = '#',
  rows,
}: RequestHistoryCardProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {actionHref && (
          <Link
            href={actionHref}
            className="text-sm font-medium text-slate-500 transition-colors hover:text-primary"
          >
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="bg-secondary text-white dark:bg-secondary/50">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                Shift Request
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                Worker Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                Total Paid
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => {
              const statusStyle = STATUS_STYLES[row.status]
              return (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {row.shiftName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {row.shiftDate} • {row.shiftTime}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {row.workerAvatarUrl ? (
                        <Image
                          src={row.workerAvatarUrl}
                          alt=""
                          width={24}
                          height={24}
                          className="size-6 rounded-full object-cover"
                        />
                      ) : (
                        <span
                          className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600 dark:bg-slate-700"
                          aria-hidden
                        >
                          {row.workerName.charAt(0)}
                        </span>
                      )}
                      <span className="text-slate-900 dark:text-slate-100">
                        {row.workerName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={statusStyle.className}>
                      {statusStyle.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">
                    {row.totalPaid}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
