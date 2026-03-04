import Image from 'next/image'

export interface FreelancerItem {
  id: string
  name: string
  role: string
  avatarUrl?: string | null
}

export interface ConfirmedFreelancersCardProps {
  title?: string
  freelancers: FreelancerItem[]
}

const DEFAULT_TITLE = 'Confirmed Freelancers'

export function ConfirmedFreelancersCard({
  title = DEFAULT_TITLE,
  freelancers,
}: ConfirmedFreelancersCardProps) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      <ul
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        role="list"
      >
        {freelancers.map((person) => (
          <li
            key={person.id}
            className="group flex cursor-pointer flex-row items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-primary dark:border-slate-800 dark:bg-slate-900"
          >
            {person.avatarUrl ? (
              <Image
                src={person.avatarUrl}
                alt=""
                width={64}
                height={64}
                className="size-16 rounded-full object-cover ring-2 ring-primary-light transition-all group-hover:ring-primary"
              />
            ) : (
              <span
                className="size-16 flex-shrink-0 rounded-full bg-slate-200 ring-2 ring-primary-light transition-all group-hover:ring-primary dark:bg-slate-700"
                aria-hidden
              >
                <span className="flex size-full items-center justify-center text-lg font-bold text-slate-600 dark:text-slate-300">
                  {person.name.charAt(0)}
                </span>
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-slate-900 dark:text-slate-100">
                {person.name}
              </p>
              <p className="truncate text-xs text-slate-500">{person.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
