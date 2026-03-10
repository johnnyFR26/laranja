'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { DayOfWeek, ShiftSlot } from '@org/types'
import {
  freelancerRegistrationSchema,
  type FreelancerRegistrationFormValues,
} from '@/validators'

const SKILLS = [
  'Fine Dining Experience',
  'Wine Service',
  'Barista Certified',
  'Advanced Knife Skills',
  'Food Preparation',
  'Deep Cleaning Protocol',
] as const

const DAYS: DayOfWeek[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Seg',
  tue: 'Ter',
  wed: 'Qua',
  thu: 'Qui',
  fri: 'Sex',
  sat: 'Sáb',
  sun: 'Dom',
}
const SHIFTS: { slot: ShiftSlot; label: string }[] = [
  { slot: 'morning', label: 'Manhã (6h–14h)' },
  { slot: 'evening', label: 'Noite (16h–0h)' },
]

const ROLE_OPTIONS: { value: FreelancerRegistrationFormValues['roleSlug']; label: string; icon: string }[] = [
  { value: 'waiter', label: 'Garçom', icon: '🍽️' },
  { value: 'kitchen-assistant', label: 'Auxiliar de Cozinha', icon: '👨‍🍳' },
  { value: 'both', label: 'Ambos', icon: '👥' },
]

const STEP = 1
const TOTAL_STEPS = 5
const PERCENT = 20

export function FreelancerRegistrationForm() {
  const router = useRouter()
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FreelancerRegistrationFormValues>({
    resolver: zodResolver(freelancerRegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      skills: [],
      availability: { morning: {}, evening: {} },
    },
  })

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [avatarPreview])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    setAvatarPreview(URL.createObjectURL(file))
    setAvatarFile(file)
  }

  const handleAvatarClick = () => {
    avatarInputRef.current?.click()
  }

  const onSubmit = (data: FreelancerRegistrationFormValues) => {
    const payload = {
      ...data,
      phone: data.phone?.trim() || null,
    }
    // TODO: enviar payload para API (incluir avatarFile se houver)
    console.log(payload, avatarFile)
    router.push('/register/complete')
  }

  const skills = watch('skills') ?? []
  const availability = watch('availability') ?? { morning: {}, evening: {} }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-8">
        {/* Progress */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-secondary dark:text-slate-100">
                  Entre na rede
                </h1>
                <p className="mt-1 text-slate-500">
                  Comece a pegar turnos nos melhores estabelecimentos hoje.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary dark:text-slate-300">
                  Etapa {STEP} de {TOTAL_STEPS}
                </p>
                <p className="text-xs text-slate-400">{PERCENT}% concluído</p>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-primary"
                style={{ width: `${PERCENT}%` }}
              />
            </div>
          </div>
        </div>

        {/* 1. Personal Info */}
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-secondary dark:text-slate-100">
            <span className="text-primary" aria-hidden>👤</span>
            <h2 className="text-xl font-bold">1. Dados pessoais</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center gap-6 pb-4 md:col-span-2">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                aria-label="Selecionar foto de perfil"
              />
              <button
                type="button"
                onClick={handleAvatarClick}
                className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-100 transition-colors hover:border-primary/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary/50"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Preview da foto de perfil"
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-slate-400" aria-hidden>📷</span>
                )}
              </button>
              <div>
                <h4 className="text-sm font-semibold">Foto de perfil</h4>
                <p className="mb-2 text-xs text-slate-500">
                  Envie uma foto profissional para os estabelecimentos.
                </p>
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="rounded-lg border border-primary px-3 py-1 text-xs font-bold text-primary hover:bg-primary/5"
                >
                  {avatarPreview ? 'Trocar imagem' : 'Enviar imagem'}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Nome completo</label>
              <input
                type="text"
                placeholder="João Silva"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Telefone</label>
              <input
                type="tel"
                placeholder="+55 (11) 00000-0000"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm font-medium">E-mail</label>
              <input
                type="email"
                placeholder="joao@exemplo.com"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-950"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">{errors.email.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* 2. Professional Role */}
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-secondary dark:text-slate-100">
            <span className="text-primary" aria-hidden>💼</span>
            <h2 className="text-xl font-bold">2. Função profissional</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ROLE_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 ${
                  watch('roleSlug') === opt.value ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <input
                  type="radio"
                  value={opt.value}
                  className="absolute right-3 top-3 size-5 shrink-0 appearance-none rounded-full border-2 border-slate-300 bg-white focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 checked:border-primary checked:bg-primary dark:border-slate-600 dark:bg-slate-800 dark:checked:border-primary dark:checked:bg-primary"
                  {...register('roleSlug')}
                />
                <span className="text-3xl" aria-hidden>{opt.icon}</span>
                <span className="text-sm font-bold">{opt.label}</span>
              </label>
            ))}
          </div>
          {errors.roleSlug && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.roleSlug.message}</p>
          )}
        </section>

        {/* 3. Skills */}
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-secondary dark:text-slate-100">
            <span className="text-primary" aria-hidden>✓</span>
            <h2 className="text-xl font-bold">3. Habilidades e experiência</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SKILLS.map((skill) => (
              <label
                key={skill}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
              >
                <input
                  type="checkbox"
                  checked={skills.includes(skill)}
                  onChange={() => {
                    const next = skills.includes(skill)
                      ? skills.filter((s) => s !== skill)
                      : [...skills, skill]
                    setValue('skills', next, { shouldValidate: true })
                  }}
                  className="size-5 shrink-0 appearance-none rounded-full border-2 border-slate-300 bg-white focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 checked:border-primary checked:bg-primary dark:border-slate-600 dark:bg-slate-800 dark:checked:border-primary dark:checked:bg-primary"
                />
                <span className="text-sm">{skill}</span>
              </label>
            ))}
          </div>
          {errors.skills && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.skills.message}</p>
          )}
        </section>

        {/* 4. Compliance */}
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-secondary dark:text-slate-100">
            <span className="text-primary" aria-hidden>📄</span>
            <h2 className="text-xl font-bold">4. Documentos e conformidade</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                icon: '🪪',
                title: 'Alvará de Manipulação de Alimentos',
                desc: 'Obrigatório para funções em cozinha',
              },
              {
                icon: '🍷',
                title: 'Licença para Servir Bebidas (RSA/TIPS)',
                desc: 'Obrigatório para bar e atendimento',
              },
              {
                icon: '🆔',
                title: 'Verificação de identidade',
                desc: 'Documento de identidade ou CNH',
              },
            ].map((doc) => (
              <div
                key={doc.title}
                className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden>{doc.icon}</span>
                  <div>
                    <p className="text-sm font-bold">{doc.title}</p>
                    <p className="text-xs text-slate-500">{doc.desc}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  Enviar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Availability */}
        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-2 text-secondary dark:text-slate-100">
            <span className="text-primary" aria-hidden>📅</span>
            <h2 className="text-xl font-bold">5. Disponibilidade</h2>
          </div>
          <p className="mb-6 text-sm text-slate-500">
            Selecione os turnos em que você costuma estar disponível. Você pode alterar isso a qualquer momento.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="py-3 text-left font-medium uppercase tracking-wider text-slate-400">
                    Turno
                  </th>
                  {DAYS.map((d) => (
                    <th key={d} className="py-3 text-center font-medium">
                      {DAY_LABELS[d]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SHIFTS.map(({ slot, label }) => (
                  <tr
                    key={slot}
                    className="border-b border-slate-50 dark:border-slate-800/50"
                  >
                    <td className="py-4 font-semibold">{label}</td>
                    {DAYS.map((day) => (
                      <td key={day} className="text-center">
                        <input
                          type="checkbox"
                          checked={Boolean(availability[slot]?.[day])}
                          onChange={() => {
                            const next = {
                              ...availability,
                              [slot]: {
                                ...availability[slot],
                                [day]: !availability[slot]?.[day],
                              },
                            }
                            setValue('availability', next, { shouldValidate: true })
                          }}
                          className="size-5 shrink-0 appearance-none rounded-full border-2 border-slate-300 bg-white focus:ring-2 focus:ring-primary/20 focus:ring-offset-0 checked:border-primary checked:bg-primary dark:border-slate-600 dark:bg-slate-800 dark:checked:border-primary dark:checked:bg-primary"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex justify-end gap-4 py-6">
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-8 py-3 font-bold transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            Salvar rascunho
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando…' : 'Continuar para revisão'}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-6 lg:col-span-4">
        <div className="rounded-xl bg-secondary p-8 text-white shadow-lg">
          <h3 className="mb-6 text-xl font-bold">Por que se cadastrar?</h3>
          <div className="space-y-6">
            {[
              { icon: '💳', title: 'Pagamentos rápidos', desc: 'Receba em até 24h após o turno. Sem esperar o contracheque.' },
              { icon: '📆', title: 'Total flexibilidade', desc: 'Escolha quando e onde trabalhar. Ideal para conciliar com estudos ou vida.' },
              { icon: '⭐', title: 'Melhores estabelecimentos', desc: 'Trabalhe nos melhores hotéis, restaurantes e eventos da cidade.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="rounded-lg bg-white/10 p-2">
                  <span className="text-primary" aria-hidden>{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-primary" aria-hidden>🔒</span>
            <h4 className="font-bold">Cadastro seguro</h4>
          </div>
          <p className="mb-4 text-xs text-slate-500">
            Seus dados são criptografados e usados apenas para verificação profissional e identidade. Não compartilhamos seus contatos sem sua permissão.
          </p>
          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
              Precisa de ajuda?
            </p>
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <span aria-hidden>💬</span>
              Falar com o suporte
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-slate-100 p-6 dark:bg-slate-800">
          <span className="absolute -right-4 -top-4 text-7xl text-primary/10 select-none" aria-hidden>
            “
          </span>
          <p className="relative z-10 text-sm italic text-slate-600 dark:text-slate-300">
            &quot;Entrar na plataforma mudou minha carreira de freelancer. Pego turnos bem pagos quando quero e o pagamento sempre chega no prazo.&quot;
          </p>
          <div className="relative z-10 mt-4 flex items-center gap-3">
            <div className="size-8 overflow-hidden rounded-full bg-slate-300" />
            <p className="text-xs font-bold">Marco, Garçom freelancer</p>
          </div>
        </div>
      </aside>
    </form>
  )
}
