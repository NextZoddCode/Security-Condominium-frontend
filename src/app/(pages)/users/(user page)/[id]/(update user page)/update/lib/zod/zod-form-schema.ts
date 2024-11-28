// Imports
import { z } from 'zod'

/* Schema do zod para fazer as validaçoes e transformações */
export const ZodFormSchema = z.object({
    name: z
        .string()
        .min(2, 'O campo deve possuir no mínimo 2 caracteres')
        .toLowerCase()
        .transform((name) => {
            return name
                .trim()
                .split(' ')
                .map((word) => {
                    return word[0].toLocaleUpperCase().concat(word.substring(1));
                })
                .join(' ');
        }),
    owner: z.boolean(),
    image: z.any(),
    email: z
        .string()
        .email('Insira um e-mail válido')
        .endsWith('.com', 'Insira um e-mail válido'),
    document: z.coerce.number({
        message: 'O cpf deve conter apenas números, nenhum caractere',
    })
        .refine(
            (number) => number.toString().length === 11,
            'O cpf deve ter 11 digitos',
        ),
    tel: z.coerce.number({
        message: 'O telefone deve conter apenas números, nenhum caractere',
    })
        .refine(
            (number) => number.toString().length === 11, // Checa para saber se o usuário digitou no minimo 11 caracteres
            'O telefone deve ter 11 digitos com DDD',
        ),
    date: z.string()
        .refine(value => {

            const dateRegex = /^\d{4}-\d{2}-\d{2}$/g

            return dateRegex.test(value) // Checa se o que usuário colocou no input, bate com a regex acima

        }, { message: 'Digite no formato dd/mm/yyyy' }),
    units: z
        .array(
            z.object({
                unity: z
                    .string()
                    .min(5, 'A unidade deve conter 5 caracteres')
                    .max(5, 'A unidade deve conter 5 caracteres'),
            }),
        )
        .min(1, 'É obrigatório no mínimo 1 unidade')
    /*.refine((units) => {
        const seen = new Set();
        for (const unit of units) {
            if (seen.has(unit.unity)) {
                return false; // Retorna false se houver duplicado
            }
            seen.add(unit.unity);
        }
        return true; // Retorna true se todos forem únicos
    }, {
        message: 'Unidades devem ser únicas',
        path: ['units'], // Especifique o caminho para a mensagem de erro
    })*/
});