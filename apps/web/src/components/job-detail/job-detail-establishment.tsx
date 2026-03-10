import type { JobDetailEstablishment } from '@/types/job-detail'

export interface JobDetailEstablishmentCardProps {
  establishment: JobDetailEstablishment
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

function VerifiedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  )
}

export function JobDetailEstablishmentCard({ establishment }: JobDetailEstablishmentCardProps) {
  const hasLogo = Boolean(establishment.logoUrl)

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-secondary p-6 text-white md:flex-row md:items-center">
      <div className="size-24 shrink-0 overflow-hidden rounded-xl">
        {hasLogo ? (
          <img
            src={establishment.logoUrl!}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center bg-white/10 text-3xl font-bold"
            aria-hidden
          >
            {establishment.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="mb-1 text-xl font-bold">Sobre {establishment.name}</h4>
        <p className="mb-4 text-sm leading-relaxed text-white/80">
          {establishment.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {establishment.rating && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-4 text-primary" />
              <span className="text-sm font-bold">{establishment.rating}</span>
            </div>
          )}
          {establishment.verified && (
            <div className="flex items-center gap-1">
              <VerifiedIcon className="size-4 text-primary" />
              <span className="text-sm font-bold">Parceiro verificado</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
