'use client'

// Imports
import { GetDataPackageForUpdate } from "../lib/react-query/get-fetch-package"
import { PatchPackageMutate } from "../lib/react-query/patch-fetch-package"
import { hookForm } from "../lib/hook-form/hook-form"
import { PackageUpdateInfer } from "../lib/zod/zod"
import { useContext, useEffect } from "react"
import { messageContext } from "@/contexts/MessageContext"

// Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput"
import NeuButton from "@/components/ui/NeuButton"
import ErrorMessage from "@/components/Messages/FormErrorMessage"
import Success from "@/components/Messages/Success"
import Erro from "@/components/Messages/Error"
import Loading from "@/components/Loading/Loading"

export default function Form({ id }: { id: string }) {

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const {
        register,
        handleSubmit,
        errors
    } = hookForm()

    const {
        mutate,
        isError: MutateError,
        isLoading: MutateLoading
    } = PatchPackageMutate(id)

    const {
        data: DataPackage,
        isError: ErrorGetPackage,
        isLoading: LoadingPackage
    } = GetDataPackageForUpdate(id)

    const updatePackage = (data: PackageUpdateInfer) => {
        mutate({
            data,
            id
        })
    }

    useEffect(() => {
        if (messageBackend !== '') {
            setTimeout(() => {
                setMessageBackend('')
            }, 5000)
        }
    }, [messageBackend])

    if (LoadingPackage) {
        return <Loading />
    }

    if (ErrorGetPackage) {
        return <Erro>Erro ao tentar carregar dados da encomenda!</Erro>
    }

    if (MutateError) {
        return <Erro>Erro ao tentar atualizar encomenda!</Erro>
    }

    return (
        <>
            {messageBackend && messageBackend === 'Encomenda atualizada com sucesso!' && (
                <Success>Encomenda atualizada com sucesso!</Success>
            )}
            {messageBackend && messageBackend !== 'Encomenda atualizada com sucesso!' && messageBackend !== '' && <Erro>{messageBackend.toString()}</Erro>
            }
            {DataPackage && (
                <>
                    <div>
                        <span>Pacote: </span>
                        <input readOnly type="text" value={DataPackage.id} />
                    </div>
                    {DataPackage.status === 'Entregue' || DataPackage.status === 'Recusado' ? (
                        <>
                            <form
                                onSubmit={handleSubmit(updatePackage)}
                                className="my-10 flex flex-col gap-6"
                            >
                                <DivLabelAndInput>
                                    <label htmlFor="status">Status:</label>
                                    <input
                                        readOnly
                                        type="text"
                                        value={DataPackage.status}
                                    />
                                </DivLabelAndInput>
                                <DivLabelAndInput>
                                    <label htmlFor="deliveredTo">Entregue para:</label>
                                    <input
                                        readOnly
                                        type="text"
                                        value={DataPackage.deliveredTo}
                                    />
                                </DivLabelAndInput>
                            </form>
                        </>
                    ) : (
                        <>
                            <form
                                onSubmit={handleSubmit(updatePackage)}
                                className="my-10 flex flex-col gap-6"
                            >
                                <DivLabelAndInput>
                                    <label htmlFor="status">Status:</label>
                                    <select
                                        className="w-48"
                                        defaultValue=""
                                        {...register('status')}
                                    >
                                        <option value="" disabled>Selecione um status</option>
                                        <option value="Entregue">Entregue</option>
                                        <option value="Recusado">Recusado</option>
                                    </select>
                                    {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}
                                </DivLabelAndInput >
                                <DivLabelAndInput>
                                    <label htmlFor="deliveredTo">Entregue para:</label>
                                    <input
                                        type="text"
                                        placeholder="Digite o nome de quem recebeu a encomenda..."
                                        {...register('deliveredTo')}
                                    />
                                    {errors.deliveredTo && <ErrorMessage>{errors.deliveredTo.message}</ErrorMessage>}
                                </DivLabelAndInput>
                                {MutateLoading ? (
                                    <NeuButton disabled type="submit">Atualizando...</NeuButton>
                                ) : (
                                    <NeuButton type="submit">Atualizar</NeuButton>
                                )}
                            </form >
                        </>
                    )}
                </>
            )}
        </>
    )
}