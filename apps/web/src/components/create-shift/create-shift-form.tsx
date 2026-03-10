'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import {
  createShiftSchema,
  type CreateShiftFormValues,
  JOB_ROLE_OPTIONS,
} from '@/validators/create-shift'
import { CreateShiftPreview } from './create-shift-preview'

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

function getMonthDays(year: number, month: number): { date: string; day: number; isCurrentMonth: boolean }[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startPad = first.getDay()
  const days: { date: string; day: number; isCurrentMonth: boolean }[] = []
  const prevMonthLast = new Date(year, month, 0).getDate()
  for (let i = 0; i < startPad; i++) {
    const d = prevMonthLast - startPad + i + 1
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    days.push({
      date: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      day: d,
      isCurrentMonth: false,
    })
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push({
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
      day: d,
      isCurrentMonth: true,
    })
  }
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    days.push({
      date: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      day: i,
      isCurrentMonth: false,
    })
  }
  return days
}

function parseDuration(start: string | undefined, end: string | undefined): { hours: number; overnight: boolean } {
  if (!start || !end) return { hours: 0, overnight: false }
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  let mins = (eh * 60 + em) - (sh * 60 + sm)
  const overnight = mins <= 0
  if (mins <= 0) mins += 24 * 60
  return { hours: Math.round((mins / 60) * 10) / 10, overnight }
}

export function CreateShiftForm() {
  const today = useMemo(() => {
    const t = new Date()
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  }, [])
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateShiftFormValues>({
    resolver: zodResolver(createShiftSchema),
    defaultValues: {
      jobRole: JOB_ROLE_OPTIONS[0],
      date: '',
      shiftStart: '18:00',
      shiftEnd: '02:00',
      hourlyRate: '',
      dressCode: '',
      description: '',
    },
  })

  const values = watch()
  const monthDays = useMemo(
    () => getMonthDays(calendarYear, calendarMonth),
    [calendarYear, calendarMonth]
  )
  const selectedDate = values.date
  const { hours, overnight } = parseDuration(values.shiftStart, values.shiftEnd)

  const onSubmit = (data: CreateShiftFormValues) => {
    const payload = {
      title: data.jobRole,
      description: data.description,
      dressCode: data.dressCode || undefined,
      date: data.date,
      shiftStart: data.shiftStart,
      shiftEnd: data.shiftEnd,
      hourlyRate: Number(data.hourlyRate),
    }
    // TODO: POST /service-offers ou endpoint de shifts
    console.log(payload)
  }

  return (
    <div className="flex flex-1 flex-col gap-8 lg:flex-row">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary dark:text-slate-100">
            Criar vaga de turno
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Defina a função, data, horário e valor para encontrar o profissional.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 rounded-xl border-t-4 border-t-primary border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary dark:text-slate-200">
                Função
              </label>
              <select
                className="rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                {...register('jobRole')}
              >
                <option value="">Selecione</option>
                {JOB_ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.jobRole && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.jobRole.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 md:col-span-2 md:flex-row">
              <div className="flex flex-col gap-2 md:flex-1">
                <label className="text-sm font-semibold text-secondary dark:text-slate-200">
                  Data
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {MONTH_NAMES[calendarMonth]} {calendarYear}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (calendarMonth === 0) {
                            setCalendarYear((y) => y - 1)
                            setCalendarMonth(11)
                          } else setCalendarMonth((m) => m - 1)
                        }}
                        className="rounded p-1 text-slate-400 transition-colors hover:text-primary"
                        aria-label="Mês anterior"
                      >
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (calendarMonth === 11) {
                            setCalendarYear((y) => y + 1)
                            setCalendarMonth(0)
                          } else setCalendarMonth((m) => m + 1)
                        }}
                        className="rounded p-1 text-slate-400 transition-colors hover:text-primary"
                        aria-label="Próximo mês"
                      >
                        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-slate-400">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {monthDays.map(({ date, day, isCurrentMonth }) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setValue('date', date, { shouldValidate: true })}
                        className={`rounded-full p-1.5 text-xs font-bold transition-colors ${
                          selectedDate === date
                            ? 'bg-primary text-white shadow-md shadow-primary/30'
                            : isCurrentMonth
                              ? 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700'
                              : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                {errors.date && (
                  <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-4 md:flex-1">
                <label className="text-sm font-semibold text-secondary dark:text-slate-200">
                  Horário do turno
                </label>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">Início</p>
                      <input
                        type="time"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        {...register('shiftStart')}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 text-[10px] font-bold uppercase text-slate-400">Fim</p>
                      <input
                        type="time"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        {...register('shiftEnd')}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-teal-200 bg-teal-50 p-3 dark:border-teal-900/30 dark:bg-teal-900/20">
                    <svg className="size-4 shrink-0 text-teal-600 dark:text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    <p className="text-xs font-medium text-teal-700 dark:text-teal-300">
                      Duração total: {hours} h {overnight ? '(noturno)' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary dark:text-slate-200">
                Valor por hora (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="45,00"
                className="rounded-lg border border-slate-200 bg-slate-50 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                {...register('hourlyRate')}
              />
              {errors.hourlyRate && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.hourlyRate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-secondary dark:text-slate-200">
                Uniforme
              </label>
              <input
                type="text"
                placeholder="Ex.: Preto profissional"
                className="rounded-lg border border-slate-200 bg-slate-50 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                {...register('dressCode')}
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-secondary dark:text-slate-200">
                Descrição da vaga
              </label>
              <textarea
                rows={4}
                placeholder="Descreva a atmosfera e as responsabilidades..."
                className="rounded-lg border border-slate-200 bg-slate-50 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <Link
              href="/jobs"
              className="text-sm font-medium text-slate-500 transition-colors hover:text-red-500"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-primary px-10 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              Criar vaga
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="w-full lg:w-[400px]">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            Preview
          </h3>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
            <span className="text-[10px] font-bold text-slate-400">ATUALIZANDO</span>
          </div>
        </div>
        <div className="mt-4">
          <CreateShiftPreview
            values={values}
            establishmentName="Seu estabelecimento"
            establishmentRating="4.9 (120+ reviews)"
          />
        </div>
      </div>
    </div>
  )
}
