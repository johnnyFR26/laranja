import { z } from 'zod'

const JOB_ROLES = [
  'Lead Mixologist',
  'Sous Chef',
  'Front of House',
  'Sommelier',
  'Garçom',
  'Auxiliar de cozinha',
  'Bartender',
] as const

export const createShiftSchema = z.object({
  jobRole: z.enum(JOB_ROLES, { error: 'Selecione uma função' }),
  date: z.string().min(1, 'Selecione a data'),
  shiftStart: z.string().min(1, 'Horário de início é obrigatório'),
  shiftEnd: z.string().min(1, 'Horário de fim é obrigatório'),
  hourlyRate: z
    .string()
    .min(1, 'Valor por hora é obrigatório')
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) >= 0, 'Valor inválido'),
  dressCode: z.string().max(255).optional().or(z.literal('')),
  description: z.string().min(1, 'Descrição é obrigatória').max(2000),
})

export type CreateShiftFormValues = z.infer<typeof createShiftSchema>

export const JOB_ROLE_OPTIONS = JOB_ROLES
