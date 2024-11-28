'use client'

// Imports
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SearchScheduleHookForm } from "../lib/hook-form/hook-form";
import { SearchScheduleInfer } from "../lib/zod/zod";
import { GetFetchSchedulesData } from "../lib/react-query/get-fetch-data";
import { messageContext } from "@/contexts/MessageContext";
import { useContext } from "react";

//Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput";
import NeuButton from "@/components/ui/NeuButton";
import SchedulesTable from "./SchedulesTable";
import Success from "@/components/Messages/Success";

export default function Form() {

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const [dataForm, setDataForm] = useState<SearchScheduleInfer>({})

    const { handleSubmit, register } = SearchScheduleHookForm()

    const { query, currentPage, setCurrentPage } = GetFetchSchedulesData(dataForm)

    const { data, isLoading, isError } = query

    function searchSchedule(data: SearchScheduleInfer) {
        setDataForm(data)
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
            {messageBackend && typeof messageBackend === 'string' && messageBackend !== '' && (
                <Success>{messageBackend}</Success>
            )}
            <form
                className="w-full flex flex-col gap-6 text-center"
                onSubmit={handleSubmit(searchSchedule)}
            >
                <div className="flex justify-between items-center sm:justify-center sm:gap-10">
                    <DivLabelAndInput>
                        <label className="self-start" htmlFor="unity">Unidade:</label>
                        <input
                            className="w-48"
                            type="text"
                            placeholder="Digite a unidade..."
                            {...register('unity')}
                        />
                    </DivLabelAndInput>
                    <DivLabelAndInput>
                        <label className="self-start" htmlFor="location">Local:</label>
                        <select
                            className="w-48"
                            defaultValue=""
                            {...register('location')}
                        >
                            <option value="" disabled>Selecione o local</option>
                            <option value="quadra">Quadra</option>
                            <option value="pool">Piscina</option>
                        </select>
                    </DivLabelAndInput>
                </div>
                <div className="flex justify-between items-center sm:justify-center sm:gap-10">
                    <DivLabelAndInput>
                        <label className="self-start" htmlFor="date">Data agendada:</label>
                        <input
                            type="date"
                            className="w-48"
                            {...register('date')}
                        />
                    </DivLabelAndInput>
                    <DivLabelAndInput>
                        <label className="self-start" htmlFor="status">Status:</label>
                        <select
                            className="w-48"
                            defaultValue=""
                            {...register('status')}
                        >
                            <option value="" disabled>Selecione o status</option>
                            <option value="agendado">Agendado</option>
                            <option value="excluido">Excluído</option>
                            <option value="utilizado">Utilizado</option>
                        </select>
                    </DivLabelAndInput>
                </div>
                <NeuButton type="submit">
                    Buscar
                </NeuButton>
            </form>

            <SchedulesTable
                data={data}
                isLoading={isLoading}
                isError={isError}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}