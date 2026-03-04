'use client'

export function FreelancersSearch() {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        placeholder="Search elite freelancers..."
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        aria-label="Search freelancers"
      />
    </div>
  )
}
