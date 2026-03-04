import Link from 'next/link'

export interface FreelancerTalentCardData {
  id: string
  name: string
  pricePerHour: string
  role: string
  specialty?: string
  avatarUrl?: string | null
  topRated?: boolean
}

export interface FreelancerTalentCardProps {
  freelancer: FreelancerTalentCardData
}

export function FreelancerTalentCard({ freelancer }: FreelancerTalentCardProps) {
  const hasImage = Boolean(freelancer.avatarUrl)

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 transition-all hover:-translate-y-1 hover:border-primary dark:border-slate-700 dark:bg-slate-800 dark:shadow-none"
      data-testid="freelancer-talent-card"
    >
      <div className="relative h-64 shrink-0 overflow-hidden">
        {hasImage ? (
          <img
            src={freelancer.avatarUrl!}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center bg-gradient-to-br from-slate-300 to-slate-400 text-6xl font-bold text-white dark:from-slate-600 dark:to-slate-700"
            aria-hidden
          >
            {freelancer.name.charAt(0)}
          </div>
        )}
        {freelancer.topRated && (
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-amber-400 px-2 py-1 text-[10px] font-black uppercase leading-none text-white shadow-sm">
              <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              TOP RATED
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="text-lg font-bold text-secondary dark:text-white">
            {freelancer.name}
          </h3>
          <span className="text-xl font-black text-primary">
            {freelancer.pricePerHour}
            <span className="text-sm font-medium">/hr</span>
          </span>
        </div>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          {freelancer.specialty ?? freelancer.role}
        </p>
        <Link
          href={`/freelancers/${freelancer.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-bold tracking-wide text-white transition-all hover:shadow-lg hover:shadow-primary/30"
        >
          Book Now
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
