// Imports
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPropsSchema, FormPropsType } from '../zod/zod'
import { useState, ChangeEvent } from "react";

//Hook personalizado para importar nos arquivos visuais
export const hookForm = () => {

    //Useform do react hook form 
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues,
        reset
    } = useForm<FormPropsType>({
        resolver: zodResolver(FormPropsSchema),
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

    //Estado da imagem que o usuário escolhe
    const [selectImage, setSelectImage] = useState<File | string>('')

    //Função para pegar o File selecionado
    function getFilename(event: ChangeEvent<HTMLInputElement>) {

        const file = event.target.files ? event.target.files[0] : ''

        setSelectImage(file)
    }

    //Retornar todas as funções e variáveis que serão usados
    return {
        register,
        handleSubmit,
        errors,
        fields,
        addUnity,
        removeUnity,
        selectImage,
        setSelectImage,
        getFilename,
        getValues,
        reset
    };
};
