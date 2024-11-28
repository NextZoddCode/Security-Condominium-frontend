'use client'

// Imports
import { UpdateHookForm } from "../lib/hook-form/update-hook-form"
import { UpdateLostInfer } from "../lib/zod/zod"
import { UpdateMutate } from "../lib/react-query/update-mutation"
import { GetLostUpdateFetch } from "../lib/react-query/get-lost-update-fetch"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { messageContext } from "@/contexts/MessageContext"

//Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput"
import NeuButton from "@/components/ui/NeuButton"
import ErrorMessage from "@/components/Messages/FormErrorMessage"
import Erro from "@/components/Messages/Error"


export default function Form({ id }: { id: string }) {

    const { replace } = useRouter()

    const { messageBackend } = useContext(messageContext)

    const { register, handleSubmit, errors } = UpdateHookForm()

    const { data } = GetLostUpdateFetch(id)

    const { mutate, isLoading, isError } = UpdateMutate(id)

    function FormUpdateLost(data: UpdateLostInfer) {
        mutate({
            id: id,
            body: data
        }, {
            onSuccess: () => {
                replace('http://localhost:3000/losts')
            }
        })
    }

    return (
        <>
            {messageBackend instanceof Error && <Erro>{messageBackend.toString()}</Erro>}
            {isError && <Erro>Erro ao tentar atualizar item perdido! Por favor, tente novamente mais tarde!</Erro>}
            <form
                onSubmit={handleSubmit(FormUpdateLost)}
                className="w-full my-10 flex flex-col gap-6"
            >
                <DivLabelAndInput>
                    <label htmlFor="status">Status:</label>
                    <select
                        className="w-48"

                        {...register('status')}
                    >
                        <option value="entregue" selected disabled>Entregue</option>
                    </select>
                    {errors.status && <ErrorMessage>{errors.status.message}</ErrorMessage>}
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label htmlFor="deliveredTo">Entregue para:</label>
                    <input
                        type="text"
                        placeholder="Digite o nome para quem foi entregue..."
                        {...register('deliveredTo')}
                    />
                    {errors.deliveredTo && <ErrorMessage>{errors.deliveredTo.message}</ErrorMessage>}
                </DivLabelAndInput>
                {isLoading ? (
                    <NeuButton disabled type="submit">
                        Atualizando...
                    </NeuButton>
                ) : (
                    <NeuButton type="submit">
                        Atualizar
                    </NeuButton>
                )}
            </form>
        </>
    )
}