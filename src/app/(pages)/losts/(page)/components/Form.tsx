// Imports

import DivLabelAndInput from "@/components/Divs/DivLabelAndInput";
import NeuButton from "@/components/ui/NeuButton";
import { Dispatch, SetStateAction } from "react";
import { LostSchemaInfer } from "../lib/zod/zod";
import { LostHookFormPage } from "../lib/hook-form/hook-form";


export default function Form({ setQueryParams }: { setQueryParams: Dispatch<SetStateAction<{}>> }) {

    const searchParams = (data: LostSchemaInfer) => {
        setQueryParams(data)
    }

    const {
        register,
        handleSubmit,
        errors
    } = LostHookFormPage()

    return (
        <>
            <form
                onSubmit={handleSubmit(searchParams)}
                className="w-full my-10 flex flex-col gap-6 text-center"
            >
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="object">Objeto:</label>
                    <input
                        type="text"
                        placeholder="Digite o tipo do objeto..."
                        {...register('object')}
                    />
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="date">Data:</label>
                    <input
                        className="w-48"
                        type="date"
                        {...register('date')}
                    />
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
                </DivLabelAndInput>
                <DivLabelAndInput>
                    <label className="self-start" htmlFor="status">Status:</label>
                    <select
                        className="w-48"
                        defaultValue=""
                        {...register('status')}
                    >
                        <option value="" disabled>Selecione o status</option>
                        <option value="perdido">Perdido</option>
                        <option value="entregue">Entregue</option>
                    </select>
                </DivLabelAndInput>
                <NeuButton type="submit">
                    Buscar
                </NeuButton>
            </form>
        </>
    )
}