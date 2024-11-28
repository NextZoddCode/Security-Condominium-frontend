'use client'

// Imports
import { LostHookForm } from "../lib/hook-form/hook-form";
import { LostItemInfer } from "../lib/zod/zod";
import { imageFunction } from "../utils/states/image-function";
import { mutationLost } from "../lib/react-query/mutation";
import { messageContext } from "@/contexts/MessageContext";
import { useQueryClient } from "react-query";
import { useContext, useEffect } from "react";

// Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput";
import NeuButton from "@/components/ui/NeuButton";
import ErrorMessage from "@/components/Messages/FormErrorMessage";
import Success from "@/components/Messages/Success";
import Erro from "@/components/Messages/Error";


export default function Form() {

    const query = useQueryClient()

    const { setMessageBackend, messageBackend } = useContext(messageContext)

    const { register, handleSubmit, errors, reset } = LostHookForm()

    const { mutate, isLoading, isError } = mutationLost()

    const { imageOnchange, selectedImage, setSelectedImage } = imageFunction()

    function createLostItem(data: LostItemInfer) {

        if (selectedImage === undefined) {
            setMessageBackend('A imagem é obrigatória!')
        }

        if (selectedImage !== undefined) {
            mutate({
                formData: data,
                selectedImage: selectedImage,
            }, {
                onError: (error) => {
                    if (error instanceof Error) {
                        setMessageBackend(error.message)
                    }
                },
                onSuccess: () => {
                    query.invalidateQueries('losts')
                    reset()
                    setSelectedImage('')
                    setMessageBackend('Item perdido cadastrado com sucesso!')
                }
            })
        }
    }

    useEffect(() => {
        if (messageBackend && messageBackend !== '') {
            setTimeout(() => {
                setMessageBackend('')
            }, 5000)
        }
    }, [messageBackend])

    return (
        <>
            {isError && <Erro>Erro ao tentar cadastrar item perdido! Por favor, tente novamente mais tarde!</Erro>}
            {messageBackend && messageBackend === 'A imagem é obrigatória!' && (
                <Erro>{messageBackend}</Erro>
            )}
            {messageBackend && messageBackend === 'Item perdido cadastrado com sucesso!' && (
                <Success>{messageBackend}</Success>
            )}
            <form
                onSubmit={handleSubmit(createLostItem)}
                className="w-full my-10 flex flex-col gap-6 text-center"
            >
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="object">Objeto:</label>
                    <input
                        type="text"
                        placeholder="Digite o tipo do objeto..."
                        {...register('object')}
                    />
                    {errors.object && <ErrorMessage>{errors.object.message}</ErrorMessage>}
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="image">Selecione uma imagem:</label>
                    <input
                        type="file"
                        placeholder="Selecione uma imagem..."
                        {...register('image', {
                            onChange: imageOnchange
                        })}
                    />
                    {!(selectedImage instanceof File) && <ErrorMessage>A imagem é obrigatória</ErrorMessage>}
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="description">Descrição:</label>
                    <textarea
                        rows={10}
                        placeholder="Coloque uma descrição sobre o objeto..."
                        {...register('description')}
                    >
                    </textarea>
                    {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="state">Estado do objeto:</label>
                    <select
                        className="w-48"
                        defaultValue=""
                        {...register('state')}
                    >
                        <option value="" disabled>Selecione o estado</option>
                        <option value="bom">Bom</option>
                        <option value="ruim">Ruim</option>
                        <option value="quebrado">Quebrado</option>
                    </select>
                    {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="date">Objeto encontrado em:</label>
                    <input
                        className="w-48"
                        type="date"
                        placeholder="Selecione uma data"
                        {...register('date')}
                    />
                    {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
                </DivLabelAndInput>
                {isLoading ? (
                    <>
                        <NeuButton disabled type="submit">
                            Enviando...
                        </NeuButton>
                    </>
                ) : (
                    <>
                        <NeuButton type="submit">
                            Cadastrar
                        </NeuButton>
                    </>
                )
                }
            </form >
        </>
    )
}