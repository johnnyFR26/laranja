'use client'

import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import axios from 'axios'
import type { AddressDto } from '@org/types'
import { AddressForm } from '@/components/address/address-form'
import { useAuth } from '@/hooks/use-auth'
import { apiClient } from '@/lib/api-client'
import { endpoints } from '@/config/api/endpoints'
import type { AddressFormValues } from '@/validators/address'

export interface AddressSideDrawerProps {
  open: boolean
  onClose: () => void
}

function addressToPartialForm(addr: AddressDto | null | undefined): Partial<AddressFormValues> {
  if (!addr) return {}
  return {
    street: addr.street ?? '',
    number: addr.number ?? '',
    complement: addr.complement ?? '',
    neighborhood: addr.neighborhood ?? '',
    city: addr.city ?? '',
    state: addr.state ?? '',
    zipCode: addr.zipCode ?? '',
    country: addr.country ?? 'BR',
  }
}

function toApiBody(v: AddressFormValues) {
  return {
    street: v.street,
    number: v.number?.trim() ? v.number.trim() : null,
    complement: v.complement?.trim() ? v.complement.trim() : null,
    neighborhood: v.neighborhood?.trim() ? v.neighborhood.trim() : null,
    city: v.city,
    state: v.state.toUpperCase(),
    zipCode: v.zipCode,
    country: v.country.toUpperCase(),
  }
}

function parseAddressId(data: unknown): number {
  if (data && typeof data === 'object' && 'id' in data) {
    const raw = (data as { id: unknown }).id
    if (typeof raw === 'number' && !Number.isNaN(raw)) return raw
    if (typeof raw === 'string') {
      const n = parseInt(raw, 10)
      if (!Number.isNaN(n)) return n
    }
  }
  throw new Error('Resposta inválida ao criar endereço.')
}

export function AddressSideDrawer({ open, onClose }: AddressSideDrawerProps) {
  const { user, hydrateFromToken } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) setFormKey((k) => k + 1)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const effectiveAddress = user?.establishment?.address ?? user?.address ?? null
  const isEstablishment = Boolean(user?.establishment)
  const defaultValues = addressToPartialForm(effectiveAddress)

  const handleSubmit = useCallback(
    async (values: AddressFormValues) => {
      if (!user) return
      const body = toApiBody(values)
      setSubmitting(true)
      try {
        if (isEstablishment) {
          const est = user.establishment
          if (!est) return
          if (est.address?.slug) {
            await apiClient.patch(endpoints.addresses.bySlug(est.address.slug), body)
          } else {
            const { data: created } = await apiClient.post<unknown>(endpoints.addresses.create, body)
            const newId = parseAddressId(created)
            await apiClient.patch(endpoints.establishments.bySlug(est.slug), { addressId: newId })
          }
        } else {
          if (user.address?.slug) {
            await apiClient.patch(endpoints.addresses.bySlug(user.address.slug), body)
          } else {
            const { data: created } = await apiClient.post<unknown>(endpoints.addresses.create, body)
            const newId = parseAddressId(created)
            await apiClient.patch(endpoints.users.bySlug(user.slug), { addressId: newId })
          }
        }
        await hydrateFromToken()
        onClose()
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const msg =
            (err.response?.data as { message?: string } | undefined)?.message ??
            (typeof err.response?.data === 'string' ? err.response.data : null)
          throw { message: msg || 'Não foi possível salvar o endereço.' }
        }
        throw err
      } finally {
        setSubmitting(false)
      }
    },
    [user, isEstablishment, hydrateFromToken, onClose],
  )

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 transition-opacity"
        aria-label="Fechar"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-drawer-title"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <h2 id="address-drawer-title" className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {isEstablishment ? 'Endereço do estabelecimento' : 'Seu endereço'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Fechar"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AddressForm
            key={formKey}
            variant="plain"
            showTitle={false}
            viacep
            idPrefix="drawer-addr"
            defaultValues={defaultValues}
            submitLabel="Salvar endereço"
            isSubmitting={submitting}
            onSubmit={handleSubmit}
          />
        </div>
      </aside>
    </div>,
    document.body,
  )
}
