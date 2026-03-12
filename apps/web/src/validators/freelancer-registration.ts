import { z } from 'zod'

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
const passwordMinLength = 8
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

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
  password: z
    .string()
    .min(passwordMinLength, 'Senha deve ter no mínimo 8 caracteres')
    .regex(passwordRegex, 'Senha deve conter maiúscula, minúscula, número e caractere especial (@$!%*?&)'),
  phone: z
    .string()
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .optional(),
  rolesIds: z.array(z.string()).min(1, 'Selecione ao menos uma função'),
  skills: z
    .array(z.string())
    .min(1, 'Selecione ao menos uma habilidade'),
  availability: availabilitySchema,
})

export type FreelancerRegistrationFormValues = z.infer<typeof freelancerRegistrationSchema>
