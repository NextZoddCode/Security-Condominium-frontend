//Imports
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodFormSchema } from './zod-form-schema';

//Criar a inferência do schema acima 
export type FormPropsType = z.infer<typeof ZodFormSchema>;

//Hook personalizado para importar nos arquivos visuais
export const zod = () => {

    //Useform do react hook form 
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm<FormPropsType>({
        resolver: zodResolver(ZodFormSchema),
    });

    //FieldArray para poder trabalhar com as units
    const { append, remove, fields } = useFieldArray({
        control,
        name: 'units',
    });

    //Função para adicionar uma unidade ao clicar no botão de adicionar
    const addUnity = () => {
        append({ unity: '' });
    };

    //Função para remover uma unidade ao clicar no botão de remover
    const removeUnity = (id: number): any => {
        remove(id);
    };

    //Retornar todas as funções e variáveis que serão usados
    return {
        register,
        handleSubmit,
        errors,
        fields,
        setValue,
        append,
        remove,
        addUnity,
        removeUnity
    };
};
