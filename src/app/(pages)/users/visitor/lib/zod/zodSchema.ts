// Imports
import { z } from 'zod'

export const FormPropsSchema = z.object({
    name: z.string()
        .min(2, 'O nome deve conter no mínimo 2 caracteres!')
        .toLowerCase()
        .transform(name => {
            return name.trim().split(' ').map(word => {
                return word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(' ')
        }),
    document: z.string()
        .refine(
            (document) => document.length === 11,
            'O cpf deve ter 11 digitos',
        ),
    description: z.string()
        .min(1, 'Adicione alguma informação!'),
    hasVehicle: z.boolean().optional(), // Flag para indicar se o usuário tem veículo ou não
    plate: z.string()
        .min(8, 'A placa não é válida!')
        .max(8, 'A placa não é válida!')
        .optional(),
    model: z.string()
        .min(2, 'Adicione o modelo do veículo')
        .optional(),
    authorized: z.string()
}).refine(data => {

    if (data.hasVehicle) {
        return data.plate && data.model
    }

    return true

}, {
    message: 'Placa e modelo do veículo são obrigatórios quando há um veículo!',
    path: ['plate', 'model']
})

export type FormPropsType = z.infer<typeof FormPropsSchema>;

// Zod User

export const FormPropsSchemaUser = z.object({
    unity: z.string()
        .min(5, 'A unidade deve conter 5 dígitos')
        .max(5, 'A unidade deve conter 5 dígitos')
})

export type FormPropsTypeUser = z.infer<typeof FormPropsSchemaUser>