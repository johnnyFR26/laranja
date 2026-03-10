'use client'

import Link from 'next/link'
import type { JobDetailData } from '@/types/job-detail'

export interface JobDetailHeroProps {
  job: JobDetailData
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

function DirectionsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M21.71 11.29l-9-9a.996.996 0 00-1.41 0l-9 9a.996.996 0 000 1.41l9 9c.39.39 1.02.39 1.41 0l9-9a.996.996 0 000-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
    </svg>
  )
}

function StarsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  const hasImage = Boolean(job.heroImageUrl)
  const directionsUrl = job.location.directionsUrl ?? '#'

  return (
    <section className="relative h-[400px] w-full md:h-[500px]">
      <div
        className="size-full bg-cover bg-center bg-no-repeat"
        style={hasImage ? { backgroundImage: `url(${job.heroImageUrl})` } : undefined}
      >
        {!hasImage && (
          <div
            className="size-full bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800"
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
      </div>

      {/* Floating map card - desktop */}
      <div className="absolute bottom-6 right-6 hidden md:right-8 md:block md:w-72">
        <div className="overflow-hidden rounded-xl border border-secondary/10 bg-white shadow-2xl dark:bg-slate-900">
          <div className="h-40 w-full bg-slate-200 dark:bg-slate-800">
            {job.location.directionsUrl ? (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-full items-center justify-center text-slate-400"
                aria-label="Ver mapa"
              >
                <LocationIcon className="size-12" />
              </a>
            ) : null}
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-start gap-2">
              <LocationIcon className="size-5 shrink-0 text-primary" />
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {job.establishment.name}
              </p>
            </div>
            <p className="pl-7 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              {job.location.address.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <Link
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary/5 py-2 text-xs font-bold text-secondary transition-colors hover:bg-secondary/10 dark:text-slate-200"
            >
              <DirectionsIcon className="size-4" />
              Como chegar
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay content */}
      <div className="absolute bottom-10 left-6 text-white md:left-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {job.tags?.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                tag.variant === 'urgent'
                  ? 'bg-primary text-white'
                  : 'bg-secondary/40 text-white backdrop-blur-md'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <h1 className="mb-2 text-4xl font-black tracking-tight md:text-6xl">
          {job.title}
        </h1>
        <p className="flex items-center gap-2 text-lg opacity-90">
          <StarsIcon className="size-5 text-primary" />
          {job.subtitle}
        </p>
      </div>
    </section>
  )
}
