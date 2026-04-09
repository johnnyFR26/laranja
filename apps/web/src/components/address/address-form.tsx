'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, type AddressFormValues } from '@/validators/address'
import { fetchViaCep, formatCepFromDigits } from '@/lib/viacep'

const emptyValues: AddressFormValues = {
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'BR',
}

export interface AddressFormProps {
  onSubmit: (data: AddressFormValues) => Promise<void>
  isSubmitting?: boolean
  onBack?: () => void
  submitLabel?: string
  showBackButton?: boolean
  /** Mescla com os valores iniciais (ex.: edição de endereço existente). */
  defaultValues?: Partial<AddressFormValues>
  /** `card`: borda e padding de página; `plain`: só espaçamento (drawer/modal). */
  variant?: 'card' | 'plain'
  showTitle?: boolean
  /** Exibe botão ao lado do CEP para preencher campos via ViaCEP. */
  viacep?: boolean
  /** Prefixo dos `id` dos campos (evita colisão com outro formulário na página). */
  idPrefix?: string
}

export function AddressForm({
  onSubmit,
  isSubmitting = false,
  onBack,
  submitLabel = 'Concluir cadastro',
  showBackButton = false,
  defaultValues: defaultValuesProp,
  variant = 'card',
  showTitle = true,
  viacep = false,
  idPrefix = 'addr',
}: AddressFormProps) {
  const [viacepLoading, setViacepLoading] = useState(false)
  const initialZipDigits = (defaultValuesProp?.zipCode ?? '').replace(/\D/g, '')
  const lastSuccessCepDigitsRef = useRef<string | null>(initialZipDigits.length === 8 ? initialZipDigits : null)
  const lastFailedAutoCepDigitsRef = useRef<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { ...emptyValues, ...defaultValuesProp },
  })

  const zipCodeWatch = watch('zipCode')

  const id = (suffix: string) => `${idPrefix}-${suffix}`

  const applyViaCepResult = useCallback(
    (data: NonNullable<Awaited<ReturnType<typeof fetchViaCep>>>, rawZip: string) => {
      clearErrors('zipCode')
      setValue('street', data.logradouro || '')
      setValue('neighborhood', data.bairro || '')
      setValue('city', data.localidade || '')
      setValue('state', (data.uf || '').toUpperCase().slice(0, 2))
      if (data.complemento) setValue('complement', data.complemento)
      const digits = (data.cep || rawZip).replace(/\D/g, '')
      if (digits.length === 8) setValue('zipCode', formatCepFromDigits(digits))
    },
    [clearErrors, setValue],
  )

  const lookupCep = useCallback(
    async (rawZip: string, source: 'auto' | 'manual') => {
      const digits = rawZip.replace(/\D/g, '')
      if (digits.length !== 8) return
      if (source === 'manual') {
        lastFailedAutoCepDigitsRef.current = null
      }
      setViacepLoading(true)
      try {
        const data = await fetchViaCep(rawZip)
        if (!data) {
          setError('zipCode', { type: 'manual', message: 'CEP não encontrado.' })
          if (source === 'auto') lastFailedAutoCepDigitsRef.current = digits
          return
        }
        applyViaCepResult(data, rawZip)
        lastSuccessCepDigitsRef.current = digits
        lastFailedAutoCepDigitsRef.current = null
      } finally {
        setViacepLoading(false)
      }
    },
    [applyViaCepResult, setError],
  )

  const handleBuscarCep = () => {
    void lookupCep(getValues('zipCode'), 'manual')
  }

  useEffect(() => {
    if (!viacep) return
    const digits = (zipCodeWatch ?? '').replace(/\D/g, '')
    if (digits.length !== 8) return
    if (lastSuccessCepDigitsRef.current === digits) return
    if (lastFailedAutoCepDigitsRef.current === digits) return

    const timeoutId = window.setTimeout(() => {
      const current = (getValues('zipCode') ?? '').replace(/\D/g, '')
      if (current !== digits) return
      void lookupCep(getValues('zipCode') ?? '', 'auto')
    }, 450)

    return () => window.clearTimeout(timeoutId)
  }, [viacep, zipCodeWatch, getValues, lookupCep])

  const onFormSubmit = async (data: AddressFormValues) => {
    try {
      await onSubmit(data)
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Erro ao cadastrar endereço. Tente novamente.'
      setError('root', { type: 'manual', message })
    }
  }

  const formSurface =
    variant === 'plain'
      ? 'space-y-4'
      : 'space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900'

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={formSurface}>
      {showTitle ? <h2 className="text-xl font-bold text-secondary dark:text-slate-100">Endereço</h2> : null}
      {errors.root && (
        <p
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400"
          role="alert"
        >
          {errors.root.message}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={viacep ? 'sm:col-span-2' : ''}>
          <label htmlFor={id('zipCode')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            CEP
          </label>
          {viacep ? (
            <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Digite o CEP primeiro; ao completar 8 dígitos a busca ocorre automaticamente (ou use o botão).
            </p>
          ) : null}
          {viacep ? (
            <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <input
                id={id('zipCode')}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                maxLength={9}
                className="min-h-[42px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                {...register('zipCode')}
              />
              <button
                type="button"
                onClick={handleBuscarCep}
                disabled={viacepLoading}
                className="shrink-0 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15 disabled:opacity-60 dark:bg-primary/20"
              >
                {viacepLoading ? 'Buscando…' : 'Buscar CEP'}
              </button>
            </div>
          ) : (
            <input
              id={id('zipCode')}
              type="text"
              placeholder="01310-100"
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              {...register('zipCode')}
            />
          )}
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.zipCode.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('street')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Logradouro
          </label>
          <input
            id={id('street')}
            type="text"
            placeholder="Rua das Flores"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('street')}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.street.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('number')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Número
          </label>
          <input
            id={id('number')}
            type="text"
            placeholder="123"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('number')}
          />
          {errors.number && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.number.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('complement')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Complemento
          </label>
          <input
            id={id('complement')}
            type="text"
            placeholder="Apto 45"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('complement')}
          />
          {errors.complement && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.complement.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('neighborhood')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Bairro
          </label>
          <input
            id={id('neighborhood')}
            type="text"
            placeholder="Centro"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('neighborhood')}
          />
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.neighborhood.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('city')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Cidade
          </label>
          <input
            id={id('city')}
            type="text"
            placeholder="São Paulo"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('city')}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.city.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('state')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Estado (UF)
          </label>
          <input
            id={id('state')}
            type="text"
            placeholder="SP"
            maxLength={2}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 uppercase focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('state')}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.state.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id('country')} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            País
          </label>
          <input
            id={id('country')}
            type="text"
            placeholder="BR"
            maxLength={2}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 uppercase focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('country')}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        {showBackButton && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Voltar
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl bg-primary py-4 font-bold text-white shadow-primary-glow transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? 'Enviando…' : submitLabel}
        </button>
      </div>
    </form>
  )
}
