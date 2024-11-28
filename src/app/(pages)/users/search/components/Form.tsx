'use client'

//Imports
import { hookForm } from "../lib/react-hook-form/hook-form";
import { FormPropsInfer } from '../lib/zod/zod'
import { useDataForm } from "../lib/react-query/useDataForm"
import { useContext, useEffect } from "react";
import { messageContext } from "@/contexts/MessageContext";

//Components
import DivLabelAndInput from "../../../../../components/Divs/DivLabelAndInput";
import NeuButton from "@/components/ui/NeuButton";
import UsersFound from "./UsersFound";
import Loading from "@/components/Loading/Loading";
import Success from "@/components/Messages/Success";
import Erro from "@/components/Messages/Error";

export default function Form() {

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const { handleSubmit, register, fields, addUnity } = hookForm();

    const { mutate, data, isLoading, isError } = useDataForm()

    const searchUser = (data: FormPropsInfer) => {
        mutate(data)
    }

    useEffect(() => {

        setTimeout(() => {
            setMessageBackend('')
        }, 5000)

    }, [messageBackend])

    return (
        <>
            {messageBackend && (
                <Success>
                    {messageBackend.toString()}
                </Success>
            )}
            <form
                onSubmit={handleSubmit(searchUser)}
                className="w-full my-20 flex flex-col gap-6">
                <div className="flex justify-center items-center gap-10">
                    <DivLabelAndInput>
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            placeholder="Insira um nome"
                            className="w-72"
                            {...register('name')}
                        />
                    </DivLabelAndInput>

                    {fields.length === 0 && (
                        <>
                            <button
                                className="text-md text-violet-500 font-bold"
                                type="button"
                                onClick={addUnity}
                            >
                                Adicionar Unidade
                            </button>
                        </>
                    )}

                    {fields.map((field, index) => (
                        <DivLabelAndInput key={field.id}>
                            <label htmlFor="">Unidade:</label>
                            <input
                                type="number"
                                placeholder="Insira uma unidade"
                                className="w-24 placeholder:text-sm"
                                {...register(`units.${index}.unity`)}
                            />
                        </DivLabelAndInput>
                    ))}
                </div>
                {isLoading ? (
                    <NeuButton disabled type="submit">Buscando...</NeuButton>
                ) : (
                    <NeuButton type="submit">Buscar</NeuButton>
                )}
            </form>
            {isError ? (
                <Erro>Erro ao tentar buscar usuário. Por favor, tente novamente mais tarde!</Erro>
            ) : (
                <UsersFound usersData={data} />
            )}
        </>
    )
}