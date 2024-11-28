'use client'

// Imports
import { zod } from '../lib/zod/zod'
import { CustomStates } from '../utils/states/custom-states'
import { FormPropsType } from '../lib/zod/zod'
import { uploadURL } from '@/app/(pages)/users/features/utils/api-url/upload-url'
import { useEffect } from 'react'
import { useMutationData } from '../lib/react-query/use-mutation'
import { useFetchData } from '../lib/react-query/use-fetch-data'
import { useContext } from 'react'
import { messageContext } from '@/contexts/MessageContext'

// Components
import NeuButton from "@/components/ui/NeuButton"
import { BsTrash } from "react-icons/bs"
import ErrorMessage from '@/components/Messages/FormErrorMessage'
import DivLabelAndInput from '@/components/Divs/DivLabelAndInput'
import DivFlexColumnCenter from '@/components/Divs/DivFlexColumnCenter'
import DivFlexInlineCenter from '@/components/Divs/DivFlexInlineCenter'
import Erro from '@/components/Messages/Error'
import Loading from '@/components/Loading/Loading'

export default function Form({ userId }: { userId: string }) {

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const { register, handleSubmit, fields, errors, append, remove, addUnity, setValue } = zod()

    const { previewImage, getFilename, unitsAddedRef } = CustomStates()

    const { data: user, isError: ErrorFetch, isLoading: LoadingFetch } = useFetchData(userId)

    const { mutate, isError: ErroMutate, isLoading: LoadingMutate } = useMutationData(userId)

    const updateUser = (userData: FormPropsType) => {

        mutate({ data: userData, id: userId })

    }

    useEffect(() => {

        if (user) {
            setValue('owner', user.owner)
            setValue('image', user.image)
        }

        if (user && user.units) {
            const userUnits = JSON.parse(user.units) as { unity: string }[];

            // Adiciona unidades apenas se ainda não tiver sido feito
            if (!unitsAddedRef.current) {
                // Limpa os campos existentes se necessário
                // ...
                // Adiciona as unidades do usuário
                userUnits.forEach(unit => append(unit));
                unitsAddedRef.current = true; // Marca como adicionado
            }
        }

    }, [user, append]);

    useEffect(() => {

        if (messageBackend !== '') {
            setTimeout(() => {
                setMessageBackend('')
            }, 10000)
        }

    }, [messageBackend])

    useEffect(() => {
        setMessageBackend('')
    }, [])

    if (LoadingFetch) {
        return <Loading />
    }

    if (ErrorFetch) {
        return <Erro>Erro ao carregar dados do usuário!</Erro>
    }

    return (
        <>
            {messageBackend && (
                <Erro>{messageBackend.toString()}</Erro>
            )}
            {user && (
                <form
                    onSubmit={handleSubmit(updateUser)}
                    className="w-full my-10 flex flex-col gap-6"
                >

                    <DivLabelAndInput>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            {...register('name')}
                            placeholder="Digite seu nome..."
                            value={user.name}
                            readOnly
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </DivLabelAndInput>

                    <div className="flex justify-between items-center gap-4 md:justify-start md:gap-20">
                        <div className="flex gap-2">
                            Propietário?
                            <input type="checkbox"
                                {...register('owner')}
                            />
                        </div>
                        <DivFlexColumnCenter>
                            <label htmlFor="image">Alterar imagem</label>
                            <input type="file"
                                accept='.jpg,.png'
                                className='text-sm text-violet-500 md:text-base'
                                {...register('image', { onChange: getFilename })}
                            />
                        </DivFlexColumnCenter>
                    </div>

                    <DivFlexInlineCenter>
                        {previewImage ? (
                            <img
                                className='w-60 h-60 rounded-full'
                                src={previewImage}
                                alt={`User: ${user.name}`}
                            />
                        ) : (
                            <img
                                className='w-60 h-60 rounded-full'
                                src={`${uploadURL}/${user.image}`}
                                alt={`User: ${user.name}`}
                            />
                        )
                        }
                    </DivFlexInlineCenter>

                    <DivLabelAndInput>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            {...register('email')}
                            placeholder="Digite seu e-mail..."
                            defaultValue={user.email}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </DivLabelAndInput>

                    <div className="flex gap-4 sm:justify-between">

                        <DivLabelAndInput>
                            <label htmlFor="document">CPF</label>
                            <input
                                type="number"
                                {...register('document')}
                                placeholder="Digite seu cpf..."
                                value={user.document}
                                readOnly
                            />
                            {errors.document && (
                                <ErrorMessage>{errors.document.message}</ErrorMessage>
                            )}
                        </DivLabelAndInput>

                        <DivLabelAndInput>
                            <label htmlFor="phone">Telefone</label>
                            <input
                                type="tel"
                                {...register('tel')}
                                placeholder="Digite seu telefone..."
                                defaultValue={user.tel}
                            />
                            {errors.tel && <ErrorMessage>{errors.tel.message}</ErrorMessage>}
                        </DivLabelAndInput>

                        <DivLabelAndInput>
                            <label htmlFor="date">Nascimento</label>
                            <input type="date"
                                {...register('date')}
                                placeholder='Exemplo 15/05/2022'
                                value={user.date}
                                readOnly
                            />
                            {errors.date && (
                                <ErrorMessage>{errors.date.message}</ErrorMessage>
                            )}
                        </DivLabelAndInput>

                    </div>

                    <div className="w-full flex flex-col gap-4">

                        <label htmlFor="">
                            Unidades
                            <button
                                onClick={addUnity}
                                type="button"
                                className="ml-10 text-sm text-violet-500"
                            >
                                Adicionar
                            </button>
                        </label>
                        {errors.units && <ErrorMessage>{errors.units.message}</ErrorMessage>}

                        {/* Combine as unidades existentes com os campos dinâmicos */}
                        {[...fields].map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-5">
                                <div className="flex items-center gap-4">
                                    <span>Unidade - {index + 1}</span>
                                    <input
                                        type="text"
                                        {...register(`units.${index}.unity` as const)}
                                        className="w-20"
                                        defaultValue={field.unity}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        <BsTrash color="red" size={24} />
                                    </button>
                                </div>
                                {errors.units?.[index]?.unity && (
                                    <ErrorMessage>{errors.units[index].unity.message}</ErrorMessage>
                                )}
                            </div>
                        ))}


                    </div>

                    {LoadingMutate ? (
                        <NeuButton disabled type="submit">Atualizando...</NeuButton>
                    ) : (
                        <NeuButton type="submit">Atualizar</NeuButton>
                    )}

                </form>
            )}
            {ErroMutate && <Erro>Erro ao tentar atualizar usuário!</Erro>}
        </>
    )
}