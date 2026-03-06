import { z } from 'zod'

/**
 * Schema para POST /auth/register (OpenAPI: RegisterDto).
 * password minLength 8 conforme API.
 */
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter no mínimo 2 caracteres'),
  phone: z
    .string()
    .max(20)
    .optional()
    .or(z.literal('')),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
