//Imports
import { ScheduleProps } from "../../../utils/types/schedule";
import { Dispatch, SetStateAction } from "react";
import { PaginationButton } from "../helpers/pagination-button";

// Components
import LoadingData from "@/components/Loading/LoadingData";
import { FaCheckCircle } from "react-icons/fa";
import ButtonPagination from "@/components/Buttons/ButtonPagination";
import Erro from "@/components/Messages/Error";
import DeleteSchedule from "./DeleteSchedule";

interface SchedulesTableProps {
    data: {
        currentPage: number,
        totalItems: number,
        totalPages: number,
        schedules: ScheduleProps[]
    },
    isLoading: boolean,
    isError: boolean,
    currentPage: number,
    setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function SchedulesTable({ data, isError, isLoading, currentPage, setCurrentPage }: SchedulesTableProps) {


    const { MAX_PAGES: MAX_VISIBLE_PAGES, ajustedPage } = PaginationButton(data?.currentPage || 1, data?.totalItems || 0);

    return (
        <div className="w-full my-10 flex flex-col justify-center items-center gap-6 text-center">
            {isLoading && isLoading ? (
                <LoadingData>Carregando agendamentos...</LoadingData>
            ) : isError ? (
                <Erro>Erro ao carregar agendamentos! Por favor, tente novamente mais tarde!</Erro>
            ) : (
                (
                    <>
                        {data && data.schedules && data.schedules.length === 0 && (
                            <span>Nenhum agendamento encontrado!</span>
                        )}
                        <table className="w-full table-auto border-collapse border border-white-500">
                            <thead>
                                <tr className="bg-violet-500 text-xs md:text-sm lg:text-base">
                                    <th className="border px-4 py-2">Usuário</th>
                                    <th className="border px-4 py-2">Data</th>
                                    <th className="border px-4 py-2">Hora</th>
                                    <th className="border px-4 py-2">Local</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Ações</th>
                                </tr >
                            </thead >
                            <tbody>
                                {data && data.schedules && data.schedules.length > 0 && data.schedules.map((schedule: ScheduleProps) => {

                                    const firstName = schedule.user.split(' ')[0]

                                    const UserAndUnity = `${firstName} ${schedule.unity}`

                                    return (
                                        <tr key={schedule.id} className="border-b text-xs md:text-sm lg:text-base">
                                            <td className="border px-4 py-2 truncate">
                                                {UserAndUnity.length > 10 ? `${UserAndUnity.slice(0, 10)}...` : UserAndUnity}
                                            </td>
                                            <td className="border px-4 py-2">{schedule.date}</td>
                                            <td className="border px-4 py-2">{schedule.hour}</td>
                                            <td className="border px-4 py-2">{schedule.location}</td>
                                            <td className="border px-4 py-2">{schedule.status}</td>
                                            <div className="flex flex-col justify-center items-center">
                                                {schedule.status === 'agendado' && (
                                                    <DeleteSchedule id={schedule.id} />
                                                )}
                                                {schedule.status === 'utilizado' && (
                                                    <FaCheckCircle className="mt-3" color="green" />
                                                )}
                                            </div>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table >
                        {data && (
                            <>
                                <div className="self-end">
                                    <span>Total agendamentos: <strong>{data && data.totalItems}</strong></span>
                                </div>
                                <div className="self-end">
                                    <span>Página: <strong>{currentPage}</strong></span>
                                </div>
                            </>
                        )}
                        <div className="flex self-end items-center gap-4">
                            {Array.from({ length: Math.min(MAX_VISIBLE_PAGES, data.totalPages) }, (_, index) => {

                                const page = ajustedPage + index

                                return (
                                    <ButtonPagination
                                        key={page}
                                        pageSelected={page === currentPage}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </ButtonPagination>
                                )
                            })}
                        </div>
                    </>
                )
            )
            }
        </div >
    )
}