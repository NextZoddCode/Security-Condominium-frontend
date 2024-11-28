// Imports
import { z } from 'zod'

export const PackageUpdateSchema = z.object({
    status: z.string().min(1, 'Selecione um status!'),
    deliveredTo: z.string().min(2, 'O nome da pessoa deve conter pelo menos 2 caracteres!')
})

export type PackageUpdateInfer = z.infer<typeof PackageUpdateSchema>