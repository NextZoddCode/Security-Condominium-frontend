//Imports
import { z } from 'zod'

export const FormPropsSchema = z.object({
    name: z.string().optional(),
    units: z.array(z.object({
        unity: z.coerce.number()
    })).optional()
});

export type FormPropsInfer = z.infer<typeof FormPropsSchema>

