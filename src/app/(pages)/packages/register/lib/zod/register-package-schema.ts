// Imports
import { z } from 'zod'

export const RegisterPackageSchemaProps = z.object({
    recipient: z.string()
        .min(2, 'O nome do destinatário deve conter no mínimo 2 caracteres'),
    packageCode: z.string()
        .min(5, 'O código deve conter no mínimo 5 caracteres'),
    transporter: z.string().optional(),
    description: z.string()
        .min(5, 'Escreva algo sobre a encomenda')
});

export type RegisterPackageInfer = z.infer<typeof RegisterPackageSchemaProps>