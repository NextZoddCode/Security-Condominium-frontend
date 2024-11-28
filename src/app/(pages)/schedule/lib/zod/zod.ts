// Imports
import { z } from 'zod'

export const ScheduleSchema = z.object({
    user: z.string({
        message: 'Insira um usuário!'
    }).min(2, 'Insira um usuário!'),
    location: z.string({
        message: 'Insira um local!'
    }),
    date: z.string({
        message: 'Insira uma data!'
    }).min(10, 'Insira uma data!'),
    hour: z.string({
        message: 'Insira a hora!'
    }).min(5, 'Insira um horário!')
});


export type ScheduleSchemaInfer = z.infer<typeof ScheduleSchema>