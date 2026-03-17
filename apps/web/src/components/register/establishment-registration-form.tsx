'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import {
  registerSchema,
  type RegisterFormValues,
} from '@/validators'
import {
  establishmentRegistrationSchema,
  type EstablishmentRegistrationFormValues,
} from '@/validators/establishment-registration'
import type { AddressFormValues } from '@/validators/address'
import { RegisterDto } from '@/types/api/auth'
import { apiClient } from '@/lib/api-client'
import { endpoints } from '@/config/api/endpoints'
import { CreateEstablishmentDto, EstablishmentDto } from '@org/types'
import { AddressForm } from '@/components/address/address-form'

const STEP_USER = 1
const STEP_ESTABLISHMENT = 2
const STEP_ADDRESS = 3
const TOTAL_STEPS = 3

export function EstablishmentRegistrationForm() {
  const router = useRouter()
  const { register: registerUser } = useAuth()
  const [step, setStep] = useState<number>(1)
  const [establishmentId, setEstablishmentId] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const userForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', name: '', phone: '' },
  })

  const establishmentForm = useForm<EstablishmentRegistrationFormValues>({
    resolver: zodResolver(establishmentRegistrationSchema),
    defaultValues: { name: '', description: '', website: '' },
  })

  const onUserSubmit = async (data: RegisterFormValues) => {
    setApiError(null)
    try {
       await registerUser({

        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone?.trim() || undefined,
        roleIds: [],
        controls: {
          skills: [],
          availability: {
            morning: {},
            evening: {},
          },
        },
      } as RegisterDto)
      setStep(STEP_ESTABLISHMENT)
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Erro ao criar conta. Tente novamente.'
      setApiError(message)
    }
  }

  const onEstablishmentSubmit = async (data: EstablishmentRegistrationFormValues) => {
    setApiError(null)
    try {
      const { data: establishment } = await apiClient.post<EstablishmentDto>(endpoints.establishments.create, {
        name: data.name,
        description: data.description?.trim() || null,
        logoUrl: data.logoUrl?.trim() || null,
        website: data.website?.trim() || null,
      } as CreateEstablishmentDto)
      setEstablishmentId(String(establishment.id))
      setStep(STEP_ADDRESS)
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Erro ao criar estabelecimento. Tente novamente.'
      setApiError(message)
    }
  }

  const onAddressSubmit = async (data: AddressFormValues) => {
    if (!establishmentId) return
    setApiError(null)
    try {
      const { data: address } = await apiClient.post<{ id: number }>(endpoints.addresses.create, {
        street: data.street,
        number: data.number || null,
        complement: data.complement || null,
        neighborhood: data.neighborhood || null,
        city: data.city,
        state: data.state.toUpperCase(),
        zipCode: data.zipCode,
        country: (data.country || 'BR').toUpperCase(),
      })
      await apiClient.patch(endpoints.establishments.byId(establishmentId), { addressId: address.id })
      router.push('/register/complete')
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Erro ao cadastrar endereço. Tente novamente.'
      setApiError(message)
    }
  }

  const progressPercent = (step / TOTAL_STEPS) * 100

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-secondary dark:text-slate-100">
              Cadastro de estabelecimento
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400">
              {step === STEP_USER
                ? 'Dados do responsável (conta de acesso).'
                : step === STEP_ESTABLISHMENT
                  ? 'Dados do seu estabelecimento.'
                  : 'Endereço do estabelecimento.'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-primary dark:text-slate-300">
              Etapa {step} de {TOTAL_STEPS}
            </p>
            <p className="text-xs text-slate-400">{Math.round(progressPercent)}% concluído</p>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {step === STEP_USER && (
        <form
          onSubmit={userForm.handleSubmit(onUserSubmit)}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-bold text-secondary dark:text-slate-100">
            1. Dados do responsável
          </h2>
          {apiError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400" role="alert">
              {apiError}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="est-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nome completo
              </label>
              <input
                id="est-name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...userForm.register('name')}
              />
              {userForm.formState.errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {userForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="est-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                E-mail
              </label>
              <input
                id="est-email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...userForm.register('email')}
              />
              {userForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {userForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="est-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Telefone
              </label>
              <input
                id="est-phone"
                type="tel"
                autoComplete="tel"
                placeholder="(00) 00000-0000"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...userForm.register('phone')}
              />
              {userForm.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {userForm.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="est-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Senha
              </label>
              <input
                id="est-password"
                type="password"
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...userForm.register('password')}
              />
              {userForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {userForm.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={userForm.formState.isSubmitting}
            className="w-full rounded-xl bg-primary py-4 font-bold text-white shadow-primary-glow transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {userForm.formState.isSubmitting ? 'Criando conta…' : 'Continuar'}
          </button>
        </form>
      )}

      {step === STEP_ESTABLISHMENT && (
        <form
          onSubmit={establishmentForm.handleSubmit(onEstablishmentSubmit)}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-bold text-secondary dark:text-slate-100">
            2. Dados do estabelecimento
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="est-name-establishment" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nome do estabelecimento
              </label>
              <input
                id="est-name-establishment"
                type="text"
                placeholder="Ex.: Restaurante do João"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...establishmentForm.register('name')}
              />
              {establishmentForm.formState.errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {establishmentForm.formState.errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="est-description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Descrição
              </label>
              <textarea
                id="est-description"
                rows={3}
                placeholder="Breve descrição do estabelecimento"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...establishmentForm.register('description')}
              />
              {establishmentForm.formState.errors.description && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {establishmentForm.formState.errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="est-website" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Site (opcional)
              </label>
              <input
                id="est-website"
                type="url"
                placeholder="https://..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...establishmentForm.register('website')}
              />
              {establishmentForm.formState.errors.website && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                  {establishmentForm.formState.errors.website.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(STEP_USER)}
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={establishmentForm.formState.isSubmitting}
              className="flex-1 rounded-xl bg-primary py-4 font-bold text-white shadow-primary-glow transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {establishmentForm.formState.isSubmitting ? 'Enviando…' : 'Continuar'}
            </button>
          </div>
        </form>
      )}

      {step === STEP_ADDRESS && (
        <div>
          {apiError && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400" role="alert">
              {apiError}
            </p>
          )}
          <AddressForm
            onSubmit={onAddressSubmit}
            onBack={() => setStep(STEP_ESTABLISHMENT)}
            showBackButton
            submitLabel="Concluir cadastro"
          />
        </div>
      )}
    </div>
  )
}
