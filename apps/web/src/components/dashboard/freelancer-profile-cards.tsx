'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { AddressDto } from '@org/types'

export interface FreelancerProfileCardsProps {
  userName: string
  avatarUrl?: string | null
  address?: AddressDto | null
  skills?: string[]
  balance?: string
}

function formatAddress(addr: AddressDto): string {
  const parts = [
    addr.street,
    addr.number,
    addr.complement,
    addr.neighborhood,
    [addr.city, addr.state].filter(Boolean).join(' - '),
    addr.zipCode,
  ].filter(Boolean)
  return parts.join(', ')
}

export function FreelancerProfileCards({
  userName,
  avatarUrl,
  address,
  skills = [],
  balance,
}: FreelancerProfileCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Foto */}
      <Link
        href="/settings?tab=profile"
        className="group flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary"
      >
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt=""
              width={96}
              height={96}
              className="size-24 object-cover"
            />
          ) : (
            <span className="text-3xl font-bold text-slate-500 dark:text-slate-400">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <svg className="size-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          </span>
        </div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {avatarUrl ? 'Alterar foto' : 'Adicionar foto'}
        </span>
      </Link>

      {/* Endereço */}
      <Link
        href="/settings?tab=address"
        className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary"
      >
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <svg className="size-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Endereço</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {address ? formatAddress(address) : 'Adicionar endereço'}
        </p>
        <span className="text-xs font-medium text-primary">Configurar</span>
      </Link>

      {/* Skills */}
      <Link
        href="/settings?tab=skills"
        className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary"
      >
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <svg className="size-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Skills</h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {skills.length > 0 ? `${skills.length} habilidade(s)` : 'Configurar skills'}
        </p>
        <span className="text-xs font-medium text-primary">Configurar</span>
      </Link>

      {/* Saldo */}
      <Link
        href="/payments"
        className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary"
      >
        <div className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <svg className="size-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Saldo</h3>
        </div>
        <p className="text-lg font-bold text-secondary dark:text-primary">
          {balance ?? 'R$ 0,00'}
        </p>
        <span className="text-xs font-medium text-primary">Resgatar saldo</span>
      </Link>
    </div>
  )
}
