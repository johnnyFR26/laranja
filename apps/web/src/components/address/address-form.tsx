'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema, type AddressFormValues } from '@/validators/address'

export interface AddressFormProps {
  onSubmit: (data: AddressFormValues) => Promise<void>
  isSubmitting?: boolean
  onBack?: () => void
  submitLabel?: string
  showBackButton?: boolean
}

export function AddressForm({
  onSubmit,
  isSubmitting = false,
  onBack,
  submitLabel = 'Concluir cadastro',
  showBackButton = false,
}: AddressFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'BR',
    },
  })

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

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="text-xl font-bold text-secondary dark:text-slate-100">Endereço</h2>
      {errors.root && (
        <p
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400"
          role="alert"
        >
          {errors.root.message}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="addr-street" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Logradouro
          </label>
          <input
            id="addr-street"
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
          <label htmlFor="addr-number" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Número
          </label>
          <input
            id="addr-number"
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
          <label htmlFor="addr-complement" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Complemento
          </label>
          <input
            id="addr-complement"
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
          <label htmlFor="addr-neighborhood" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Bairro
          </label>
          <input
            id="addr-neighborhood"
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
          <label htmlFor="addr-city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Cidade
          </label>
          <input
            id="addr-city"
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
          <label htmlFor="addr-state" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Estado (UF)
          </label>
          <input
            id="addr-state"
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
          <label htmlFor="addr-zipCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            CEP
          </label>
          <input
            id="addr-zipCode"
            type="text"
            placeholder="01310-100"
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            {...register('zipCode')}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.zipCode.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="addr-country" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            País
          </label>
          <input
            id="addr-country"
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
