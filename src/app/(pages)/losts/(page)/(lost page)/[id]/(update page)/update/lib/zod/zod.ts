// Imports
import { z } from 'zod'

export const UpdateLostSchema = z.object({
    status: z.string(),
    deliveredTo: z.string({
        message: 'Um nome não pode conter números!'
    }).min(2, 'Digite pelo menos 2 caracteres!')
});

export type UpdateLostInfer = z.infer<typeof UpdateLostSchema>;