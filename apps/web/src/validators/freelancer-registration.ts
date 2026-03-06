import { z } from 'zod'

const ROLE_SLUGS = ['waiter', 'kitchen-assistant', 'both'] as const

const availabilitySchema = z.object({
  morning: z.record(z.string(), z.boolean()),
  evening: z.record(z.string(), z.boolean()),
})

/**
 * Schema de validação do formulário de cadastro de freelancer.
 * Sem transforms ou defaults — input e output são o mesmo tipo,
 * o que mantém compatibilidade total com react-hook-form v7 + Zod v4.
 * Conversões de payload (ex.: phone vazio → null) ocorrem no onSubmit antes de chamar a API.
 */
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
    .optional(),
  roleSlug: z.enum(ROLE_SLUGS, { error: 'Selecione uma função' }),
  skills: z
    .array(z.string())
    .min(1, 'Selecione ao menos uma habilidade'),
  availability: availabilitySchema,
})

export type FreelancerRegistrationFormValues = z.infer<typeof freelancerRegistrationSchema>
