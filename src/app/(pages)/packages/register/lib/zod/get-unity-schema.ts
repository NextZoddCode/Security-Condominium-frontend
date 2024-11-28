// Imports
import { z } from 'zod'

export const GetUnitySchemaProps = z.object({
    unity: z.string()
        .min(5, 'A unidade deve conter 5 números!')
        .max(5, 'A unidade deve conter 5 números!')
})

export type GetUnitySchemaInfer = z.infer<typeof GetUnitySchemaProps>