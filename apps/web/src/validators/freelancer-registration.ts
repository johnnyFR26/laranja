import { z } from 'zod'

const ROLE_SLUGS = ['waiter', 'kitchen-assistant', 'both'] as const

/** Objeto de disponibilidade: para cada turno, um objeto dia -> boolean */
const availabilitySchema = z.object({
  morning: z.record(z.string(), z.boolean()).optional().default({}),
  evening: z.record(z.string(), z.boolean()).optional().default({}),
})

export const freelancerRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  phone: z
    .string()
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .optional()
    .nullable()
    .transform((v) => v === '' ? null : v ?? null),
  roleSlug: z.enum(ROLE_SLUGS, {
    required_error: 'Selecione uma função',
    invalid_type_error: 'Selecione uma função',
  }),
  skills: z
    .array(z.string())
    .min(1, 'Selecione ao menos uma habilidade')
    .default([]),
  availability: availabilitySchema.optional().default({ morning: {}, evening: {} }),
})

export type FreelancerRegistrationFormValues = z.infer<typeof freelancerRegistrationSchema>
