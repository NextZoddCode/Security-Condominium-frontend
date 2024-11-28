'use client'

// Imports
import React, { useContext, useEffect, useState } from 'react'
import { StatesAndFunctions } from "../utils/states-and-functions"
import { hookForm, hookFormUser } from "../lib/react-hook-form/hook-form"
import { FormPropsType, FormPropsTypeUser } from "../lib/zod/zodSchema"
import { useMutateUnity } from "../lib/react-query/useMutation"
import { MutateVisitor } from '../lib/react-query/mutate-visitor'
import { messageContext } from '@/contexts/MessageContext'

// Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput"
import NeuButton from "@/components/ui/NeuButton"
import ErrorMessage from "@/components/Messages/FormErrorMessage"
import Erro from '@/components/Messages/Error'
import Success from '@/components/Messages/Success'

// Types
import { UserSchema } from "../../features/utils/types/UserSchema"
import { UserSchemaForVisitor } from '../utils/types/types'

export default function Form() {

    const { isHaveVehicle, getVehicle } = StatesAndFunctions()

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const {
        handleSubmit,
        register,
        errors,
        getValues,
        reset
    } = hookForm()

    const {
        register: registerUnity,
        handleSubmit: handleSubmitUnity,
        errors: errorUnity,
        getValues: getValuesUnity,
        reset: resetUnity
    } = hookFormUser()

    const { data: dataUnity, mutate: mutateUnity } = useMutateUnity()

    const [dataUserUnity, setDataUserUnity] = useState<Object[] | null>([])

    const { mutate: mutateVisitor } = MutateVisitor()

    const findUnity = (data: FormPropsTypeUser) => {
        mutateUnity(data)
    }

    const registerVisitor = (data: FormPropsType) => {

        const userId = getValues('authorized')

        const unity = getValuesUnity('unity')

        const userDataUnity = dataUnity.filter((user: UserSchema, index: number) => {
            return user.id === userId
        })

        const userUnity = userDataUnity[0]

        const user: UserSchemaForVisitor = {
            user: userUnity,
            unity: unity
        }

        delete data.hasVehicle

        mutateVisitor({
            ...data,
            ...user
        }, {
            onSuccess: () => {
                reset()
                resetUnity()
                setDataUserUnity(null)
            }
        })



    }

    useEffect(() => {

        if (dataUnity && dataUnity.length > 0) {
            setDataUserUnity(dataUnity)
        }

    }, [dataUnity])

    useEffect(() => {

        setTimeout(() => {
            setMessageBackend('')
        }, 5000)

    }, [messageBackend])

    console.log(typeof messageBackend, messageBackend)

    return (
        <>
            {messageBackend && messageBackend === 'Visitante registrado com sucesso!' && (
                <Success>{messageBackend}</Success>
            )}
            <form
                className="className=flex flex-col justify-center items-center gap-6 my-10"
                onSubmit={handleSubmitUnity(findUnity)}
            >
                <DivLabelAndInput>
                    <label htmlFor="unity" className='text-center'>Unidade:</label>
                    <input type="number" {...registerUnity('unity')} />
                    {errorUnity.unity?.message && <ErrorMessage>{errorUnity.unity.message}</ErrorMessage>}
                </DivLabelAndInput>
                <NeuButton type='submit'>Buscar</NeuButton>
            </form>
            {dataUserUnity && dataUserUnity.length > 0 && (
                <form
                    onSubmit={handleSubmit(registerVisitor)}
                    className="className= w-full my-10 flex flex-col gap-6">
                    <DivLabelAndInput>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            placeholder="Nome do visitante..."
                            {...register('name')}
                        />
                        {errors.name?.message && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                    </DivLabelAndInput>
                    <div className="w-full flex justify-between items-center gap-4 sm:justify-start sm:gap-8">
                        <DivLabelAndInput>
                            <label htmlFor="document">Documento:</label>
                            <input
                                type="text"
                                placeholder="Documento do visitante..."
                                {...register('document')}
                            />
                            {errors.document?.message && <ErrorMessage>{errors.document.message}</ErrorMessage>}
                        </DivLabelAndInput>
                        <DivLabelAndInput>
                            <label>Hora:</label>
                            <input
                                readOnly
                                type="text"
                                value={`${new Date()}`}
                            />
                        </DivLabelAndInput>
                    </div>
                    <DivLabelAndInput>
                        <label htmlFor="description">Adicione mais informações</label>
                        <textarea
                            rows={10}
                            placeholder="Exemplo: Nome de outros visitantes que possam estar juntos, documentos e etc..."
                            {...register('description')}
                        ></textarea>
                        {errors.description?.message && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </DivLabelAndInput>
                    <div className="flex">
                        <label className="flex justify-start items-center gap-6">
                            Está com algum veículo?
                            <input
                                type="checkbox"
                                className="flex-1"
                                {...register('hasVehicle')}
                                onChange={getVehicle} />
                        </label>
                    </div>
                    {isHaveVehicle && (
                        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                            <DivLabelAndInput>
                                <label htmlFor="plate">Placa:</label>
                                <input
                                    type="text"
                                    placeholder="Placa do veículo..."
                                    {...register('plate')}
                                />
                                {errors.plate?.message && <ErrorMessage>{errors.plate.message}</ErrorMessage>}
                            </DivLabelAndInput>
                            <DivLabelAndInput>
                                <label htmlFor="model">Modelo:</label>
                                <input
                                    type="text"
                                    placeholder="Modelo do veículo..."
                                    {...register('model')}
                                />
                                {errors.model?.message && <ErrorMessage>{errors.model.message}</ErrorMessage>}
                            </DivLabelAndInput>
                        </div>
                    )}
                    <div className="flex items-center gap-8">
                        <span className="text-center">Autorizado por:</span>
                        <select
                            defaultValue=""
                            className="text-center font-bold p-2 w-3/4"
                            {...register('authorized')}
                        >
                            <option value="" disabled>
                                Selecione um usuário
                            </option>
                            {dataUnity.map((user: UserSchema) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <NeuButton type="submit">Registrar</NeuButton>
                </form >
            )}
            {dataUnity && dataUnity.length === 0 && (
                <div>
                    <p>Nenhuma unidade encontrada</p>
                </div>
            )}
        </>
    )
}