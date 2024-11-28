// Imports
import { z } from 'zod'

export const LostItemSchema = z.object({
    object: z.string({ message: 'Digite um objeto válido!' })
        .min(2, 'O objeto deve ter pelo menos 2 caracteres!'),
    image: z.any(),
    description: z.string().min(10, 'Digite alguma descrição sobre o objeto!'),
    state: z.string().min(3, 'Inserir o estado é obrigatório!'),
    date: z.string().min(5, 'Inserir uma data é obrigatório!')
});

export type LostItemInfer = z.infer<typeof LostItemSchema>