'use client'

// Imports
import React, { useEffect, useState, useContext } from 'react'
import { GetUnityHookForm } from '../lib/react-hook-form/get-unity-hook-form'
import { PackageHookForm } from '../lib/react-hook-form/register-package-hook-form'
import { GetUnitySchemaInfer } from '../lib/zod/get-unity-schema'
import { MutationUnity } from '../lib/react-query/mutation-unity'
import { messageContext } from '@/contexts/MessageContext'
import { RegisterPackageInfer } from '../lib/zod/register-package-schema'
import { MutatePackage } from '../lib/react-query/mutate-package'
import { UserSchema } from '@/app/(pages)/users/features/utils/types/UserSchema'
import { UserPropsForPackage } from '../utils/types/types'

// Components
import DivLabelAndInput from '@/components/Divs/DivLabelAndInput'
import Success from '@/components/Messages/Success'
import Erro from '@/components/Messages/Error'
import ErrorMessage from '@/components/Messages/FormErrorMessage'
import NeuButton from '@/components/ui/NeuButton'



export default function Form() {

    const { setMessageBackend, messageBackend } = useContext(messageContext)

    const {
        register: registerUnity,
        handleSubmit: handleSubmitUnity,
        errors: errorsUnity,
        getValues: getValueUnity,
        reset: resetUnity
    } = GetUnityHookForm()

    const {
        registerPackage,
        handleSubmitPackage,
        errorsPackage,
        resetPackageForm
    } = PackageHookForm()

    const [userDataUnity, setUserDataUnity] = useState<UserSchema[] | null>([])

    const { data: dataUnity, mutate: mutateUnity, isError: ErrorUnity } = MutationUnity()

    const { mutate: mutatePackage, isError: isErrorPackage, isLoading: LoadingPackage } = MutatePackage()

    const SearchUnity = (data: GetUnitySchemaInfer) => {
        mutateUnity(data, {
            onError: (error) => {
                if (error instanceof Error) {
                    setMessageBackend(error.message)
                }
            }
        })
    }

    const RegisterPackage = (data: RegisterPackageInfer) => {

        if (userDataUnity && userDataUnity.length > 0) {
            const user = userDataUnity.filter((user: UserSchema) => {
                return user.owner === true
            })

            const firstUser = user ? user[0] : user

            const userUnity: UserPropsForPackage = {
                user: firstUser
            }

            const unity = getValueUnity('unity')

            userUnity.unit = unity

            mutatePackage({
                ...data,
                ...userUnity
            }, {
                onError: (error) => {
                    if (error instanceof Error) {
                        setMessageBackend(error.message)
                    }
                },
                onSuccess: () => {
                    resetPackageForm()
                    resetUnity()
                    setUserDataUnity(null)
                    setMessageBackend('Encomenda registrada com sucesso!')
                }
            })

        }

    }

    useEffect(() => {
        if (dataUnity && dataUnity.length > 0) {
            setUserDataUnity(dataUnity)
        }
    }, [dataUnity])

    useEffect(() => {
        setTimeout(() => {
            setMessageBackend('')
        }, 5000)
    }, [messageBackend])

    if (ErrorUnity) {
        return <Erro>Erro ao tentar buscar uma unidade. Por favor, tente novamente mais tarde!</Erro>
    }

    return (
        <>
            {messageBackend && messageBackend === 'Encomenda registrada com sucesso!' && (
                <Success>{messageBackend}</Success>
            )}
            {messageBackend && messageBackend !== 'Encomenda registrada com sucesso!' && messageBackend !== '' && (
                <Erro>{messageBackend.toString()}</Erro>
            )}
            {/* ErrorUnity && <Erro>Erro ao tentar buscar uma unidade. Por favor, tente novamente mais tarde!</Erro> */}
            <form
                onSubmit={handleSubmitUnity(SearchUnity)}
                className="my-10 flex flex-col gap-6"
            >
                <DivLabelAndInput>
                    <label
                        htmlFor="unity"
                        className='text-center'
                    >
                        Unidade:
                    </label>
                    <input
                        type="text"
                        placeholder='Unidade do usuário...'
                        {...registerUnity('unity')}
                    />
                    {errorsUnity.unity && <ErrorMessage>{errorsUnity.unity.message}</ErrorMessage>}
                </DivLabelAndInput>
                <NeuButton type='submit'>Buscar</NeuButton>
            </form>
            {dataUnity && dataUnity.length === 0 && (
                <span>Nenhuma unidade encontrada!</span>
            )}
            {userDataUnity && userDataUnity.length > 0 && (
                <form
                    className="w-full my-10 flex flex-col gap-6"
                    onSubmit={handleSubmitPackage(RegisterPackage)}
                >
                    <DivLabelAndInput>
                        <label htmlFor="recipient">Destinatário:</label>
                        <input
                            type="text"
                            placeholder='Nome do destinatário...'
                            {...registerPackage('recipient')}
                        />
                        {errorsPackage.recipient &&
                            <ErrorMessage>
                                {errorsPackage.recipient.message}
                            </ErrorMessage>
                        }
                    </DivLabelAndInput>
                    <DivLabelAndInput>
                        <label htmlFor="packageCode">Código:</label>
                        <input
                            type="text"
                            placeholder='Código da encomenda...'
                            {...registerPackage('packageCode')}
                        />
                        {errorsPackage.packageCode &&
                            <ErrorMessage>
                                {errorsPackage.packageCode.message}
                            </ErrorMessage>
                        }
                    </DivLabelAndInput>
                    <DivLabelAndInput>
                        <label htmlFor="transporter">Transportadora:</label>
                        <input
                            type="text"
                            placeholder='Nome da transportadora...'
                            {...registerPackage('transporter')}
                        />
                        {errorsPackage.transporter &&
                            <ErrorMessage>
                                {errorsPackage.transporter.message}
                            </ErrorMessage>
                        }
                    </DivLabelAndInput>
                    <DivLabelAndInput>
                        <label htmlFor="description">Descrição:</label>
                        <textarea
                            rows={10}
                            placeholder='Descreva a encomenda, grande ou pequena, e etc...'
                            {...registerPackage('description')}
                        >
                        </textarea>
                        {errorsPackage.description &&
                            <ErrorMessage>
                                {errorsPackage.description.message}
                            </ErrorMessage>
                        }
                    </DivLabelAndInput>
                    {LoadingPackage ? (
                        <NeuButton disabled type='submit'>Cadastrando...</NeuButton>
                    ) : (
                        <NeuButton type='submit'>Cadastrar</NeuButton>
                    )}
                </form>
            )}
            {isErrorPackage && (
                <Erro>Erro ao tentar registrar encomenda! Por favor, tente novamente mais tarde!</Erro>
            )}
        </>
    )
}