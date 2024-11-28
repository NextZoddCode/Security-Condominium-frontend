'use client'

// Imports
import { hookForm } from "@/app/(pages)/users/search/lib/react-hook-form/hook-form";
import { useDataForm } from "@/app/(pages)/users/search/lib/react-query/useDataForm";
import { FormPropsInfer } from "@/app/(pages)/users/search/lib/zod/zod";
import { ScheduleRegisterHookForm } from "../../../lib/hook-form/hook-form";
import { ScheduleSchemaInfer } from "../../../lib/zod/zod";
import { UserSchema } from "@/app/(pages)/users/features/utils/types/UserSchema";
import { CreateMutateSchedule } from "../../../lib/react-query/create-mutate-schedule";
import { useContext, useEffect, useState } from "react";
import { messageContext } from "@/contexts/MessageContext";
import { GetFetchCourtSchedules } from "../lib/react-query/get-fetch-court-schedules";
import { useQueryClient } from "react-query";

// Components
import DivLabelAndInput from "@/components/Divs/DivLabelAndInput";
import NeuButton from "@/components/ui/NeuButton";
import ErrorMessage from "@/components/Messages/FormErrorMessage";
import Success from "@/components/Messages/Success";
import Erro from "@/components/Messages/Error";


export default function Form() {

    // Função do react-query para atualizar os dados após um mutate
    const query = useQueryClient()

    // Message para respostas que vem do backend 
    const { messageBackend, setMessageBackend } = useContext(messageContext)


    // Funções e estados que vem do react-hook-form referentes ao usuário
    const { register, handleSubmit, fields, addUnity, getValues: getValuesUser, reset: resetUser } = hookForm()

    // Função do mutate para buscar os dados do usuário
    const { mutate, isLoading, isError, data: dataUsers } = useDataForm()

    // Função usada no submit do formulário para buscar os dados do usuário
    function SearchUser(data: FormPropsInfer) {

        if (data.units && data.units.length === 0) {
            setMessageBackend('Insira uma unidade!')
            return
        }

        if (data.units && data.units[0].unity === 0) {
            setMessageBackend('Insira uma unidade válida!')
            return
        }

        setMessageBackend('')

        mutate(data)
    }

    // Funções e estados que retornam referente aos agendamentos
    const {
        data: CourtSchedulesData,
        isError: isErrorCourtSchedulesData,
        isLoading: isLoadingCourtSchedulesData
    } = GetFetchCourtSchedules()

    // Estado que serve para filtrar as datas e horarios ocupados dos agentamentos
    const [occupiedDates, setOccupiedDates] = useState<{ date: string; hour: string }[]>([]);

    // Função que retorna um true ou false para as datas e horários que já estao ocupadas
    const isDateAvailable = (date: string, hour: string): boolean => {

        // Verifica se a data e hora estão ocupadas
        const isOccupied = occupiedDates.some(
            (occupied) => occupied.date === date && occupied.hour === hour
        );

        if (isOccupied) {
            return false
        }

        const now = new Date()

        const dateNow = now.getDate()

        const formated = new Intl.DateTimeFormat('pt-BR', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(now)

        if (dateNow >= parseInt(date) && formated > hour) {
            return false
        }

        return true
    };

    // Funções do react-hook-form referente aos agendamentos
    const { handleSubmit: handleSubmitSchedule, register: registerSchedule, errors: errorsSchedule, getValues: getValueSchedule, reset: resetScheduleForm } = ScheduleRegisterHookForm()

    // Estado para ficar checando a data que o usuário insere
    const [selectedDate, setSelectedDate] = useState<string>("");

    // Funções do usemutation referente aos agendamentos
    const { mutate: mutateSchedule, isError: isErrorSchedule, isLoading: isLoadingSchedule, isSuccess } = CreateMutateSchedule()

    // Estado para checar se os dados retornardos de usuários existem
    const [checkDataUserExists, setCheckDataUserExists] = useState<object[] | undefined | null>(null)

    // Função usada no submit do form para criar um agendamento
    function createSchedule(data: ScheduleSchemaInfer) {

        const userId = getValueSchedule('user')
        const unity = getValuesUser('units')

        const schedule = {
            userName: dataUsers.filter((user: UserSchema) => user.id === userId)[0].name,
            unity: String(unity![0].unity),
            ...data,
        }

        mutateSchedule(schedule, {
            onSuccess: () => {
                setMessageBackend('Agendamento realizado com sucesso!')
                resetUser()
                resetScheduleForm()
                query.invalidateQueries('schedules')
                setCheckDataUserExists(null)
            },
            onError: (error) => {
                if (error instanceof Error) {
                    setMessageBackend(error)
                }
            }
        })
    }

    // Checa se existe os dados retornardos de usuário existem, se sim, salvo em um estado
    useEffect(() => {

        if (dataUsers && dataUsers.length === 0) {
            setCheckDataUserExists(undefined)
        }

        if (dataUsers && dataUsers.length > 0) {
            setCheckDataUserExists(dataUsers)
        }

    }, [dataUsers])

    // Filtrar e salvar em uma váriavel apenas as propriedades date e hour que serão usadas para checar as datas já agendadas 
    useEffect(() => {

        if (CourtSchedulesData && CourtSchedulesData.length > 0) {

            // Filtrar as datas e horas ocupadas
            const occupied: { date: string, hour: string }[] = CourtSchedulesData.map((schedule: any) => {
                return {
                    date: schedule.date, // Data formatada (por exemplo "27/10/2024")
                    hour: schedule.hour   // Hora agendada (por exemplo "07:00")
                };
            });

            setOccupiedDates(occupied);

        }

    }, [CourtSchedulesData]);

    useEffect(() => {

    }, [selectedDate])

    // Checa se tem mensagem do backend, e se tiver e for diferente de string vazia, depois de um tempo a mensagem some
    useEffect(() => {

        if (messageBackend && messageBackend !== '') {

            setTimeout(() => {
                setMessageBackend('')
            }, 8000)

        }

    }, [messageBackend])

    // Estado para armazenar a data mínima e máxima
    const [minDate, setMinDate] = useState<string>("");
    const [maxDate, setMaxDate] = useState<string>("");

    // Função que configura as datas mínima e máxima
    const setDateLimits = () => {
        const today = new Date();
        const dayAfterTomorrow = new Date(today);

        // Configura o formato de data "YYYY-MM-DD" que o input do tipo date requer
        const formatDate = (date: Date) => date.toISOString().split("T")[0];

        // Define a data mínima como hoje
        setMinDate(formatDate(today));

        // Define a data máxima como dois dias após hoje
        dayAfterTomorrow.setDate(today.getDate() + 2);
        setMaxDate(formatDate(dayAfterTomorrow));
    };

    // Atualiza as datas quando o componente for montado
    useEffect(() => {
        setDateLimits();
    }, []);

    return (
        <>

            {messageBackend && messageBackend === 'Agendamento realizado com sucesso!' && (
                <Success>{messageBackend}</Success>
            )}
            {messageBackend && messageBackend === 'Insira uma unidade!' && (
                <Erro>{messageBackend}</Erro>
            )}
            {messageBackend && messageBackend === 'Insira uma unidade válida!' && (
                <Erro>{messageBackend}</Erro>
            )}
            {messageBackend && typeof messageBackend === 'object' && (
                <Erro>{messageBackend.message.toString()}</Erro>
            )}

            <div className="flex flex-col justify-center items-center">

                <h2
                    style={{ textShadow: '4px 6px 5px gray' }}
                    className="text-3xl font-bold"
                >
                    Buscar Usuário
                </h2>

                <form
                    onSubmit={handleSubmit(SearchUser)}
                    className="w-full my-10 flex flex-col gap-6">
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

                {checkDataUserExists && checkDataUserExists.length > 0 ? (
                    <>

                        <h2
                            style={{ textShadow: '4px 6px 5px gray' }}
                            className="text-3xl font-bold my-10"
                        >
                            Reservar Quadra
                        </h2>

                        <form
                            onSubmit={handleSubmitSchedule(createSchedule)}
                            className="w-full my-10 flex flex-col gap-6">

                            <DivLabelAndInput>
                                <label htmlFor="user">Usuário que reserva:</label>
                                <select
                                    className="w-full"
                                    defaultValue=""
                                    {...registerSchedule('user')}
                                >
                                    <option value="" disabled selected>Escolha um usuário</option>
                                    {dataUsers && dataUsers.map((user: any, index: number) => {
                                        return (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                {errorsSchedule.user && <ErrorMessage>{errorsSchedule.user.message}</ErrorMessage>}
                            </DivLabelAndInput>

                            <DivLabelAndInput>
                                <label htmlFor="location">Local:</label>
                                <input
                                    type="text"
                                    readOnly
                                    value="quadra"
                                    {...registerSchedule('location')}
                                />
                                {errorsSchedule.location && <ErrorMessage>{errorsSchedule.location.message}</ErrorMessage>}
                            </DivLabelAndInput>

                            <div className="flex justify-start items-center gap-10">
                                <DivLabelAndInput>
                                    <label htmlFor="date">Data da reserva:</label>
                                    <input
                                        type="date"
                                        {...registerSchedule('date')}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={minDate}
                                        max={maxDate}
                                    />
                                    {errorsSchedule.date && <ErrorMessage>{errorsSchedule.date.message}</ErrorMessage>}
                                </DivLabelAndInput>
                                <DivLabelAndInput>
                                    <label htmlFor="hour">Hora da reserva:</label>
                                    <select
                                        defaultValue=""
                                        {...registerSchedule('hour')}
                                    >
                                        <option value="" selected>Escolha um horario</option>
                                        {Array.from(['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], (hour, index) => {

                                            const dataFormatada = selectedDate ? new Date(selectedDate) : new Date()

                                            dataFormatada.setDate(dataFormatada.getDate() + 1)

                                            const formattedDate = new Intl.DateTimeFormat('pt-BR').format(dataFormatada)


                                            const isAvailable = selectedDate ? isDateAvailable(formattedDate, hour) : true

                                            return (
                                                <option
                                                    key={index}
                                                    value={hour}
                                                    disabled={!isAvailable}
                                                    className=" disabled:text-black"
                                                >
                                                    {hour}
                                                </option>
                                            )
                                        })
                                        }
                                    </select>
                                    {errorsSchedule.hour && <ErrorMessage>{errorsSchedule.hour.message}</ErrorMessage>}
                                </DivLabelAndInput>
                            </div>

                            <NeuButton type="submit">
                                Reservar
                            </NeuButton>

                        </form>

                    </>
                ) : checkDataUserExists === undefined ? (
                    (
                        <>
                            <span className="text-center text-2xl">Nenhum usuário encontrado para esta unidade!</span>
                        </>
                    )
                ) : (
                    (
                        <>
                            <span className="text-center text-2xl hidden">Nenhum usuário encontrado para esta unidade!</span>
                        </>
                    )
                )}

            </div>
        </>
    )
}