// Imports
import { object, z } from 'zod'

export const LostSchema = z.object({
    object: z.string().optional(),
    date: z.string().optional(),
    state: z.string().optional(),
    status: z.string().optional()
})

export type LostSchemaInfer = z.infer<typeof LostSchema>