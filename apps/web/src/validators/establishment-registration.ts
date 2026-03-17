import { z } from 'zod'

/**
 * Etapa 2 do cadastro de estabelecimento (CreateEstablishmentDto).
 * ownerId é preenchido no submit com o user.id do store após registro.
 */
export const establishmentRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome do estabelecimento é obrigatório')
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  description: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional()
    .or(z.literal('')),
  logoUrl: z.string().url().optional().or(z.literal('')),
  website: z.string().url('URL do site inválida').optional().or(z.literal('')),
})

export type EstablishmentRegistrationFormValues = z.infer<typeof establishmentRegistrationSchema>
