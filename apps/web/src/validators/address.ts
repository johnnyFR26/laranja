import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string().min(1, 'Logradouro é obrigatório').max(255),
  number: z.string().max(20).optional().nullable(),
  complement: z.string().max(100).optional().nullable(),
  neighborhood: z.string().max(100).optional().nullable(),
  city: z.string().min(1, 'Cidade é obrigatória').max(100),
  state: z.string().length(2, 'Estado deve ter 2 caracteres (ex: SP)'),
  zipCode: z.string().min(1, 'CEP é obrigatório').max(20),
  country: z.string().length(2, 'País deve ter 2 caracteres (ex: BR)').optional().default('BR'),
})

export type AddressFormValues = z.infer<typeof addressSchema>
