// Imports
import { LostsTableInterface } from "../utils/types/losts-table"
import { LostsInterface } from "../utils/types/losts-table"
import { frontendURL } from "../features/utils/url/frontendURL"
import { PaginationButton } from "../helpers/pagination-button"

//Components
import LoadingData from "@/components/Loading/LoadingData"
import Link from "next/link"
import ButtonPagination from "@/components/Buttons/ButtonPagination"
import DeleteLost from "./DeleteLost"
import Erro from "@/components/Messages/Error"

export default function LostsTable({ lostsData, isError, isLoading, setCurrentPage }: LostsTableInterface) {

    const { MAX_VISIBLE_PAGES, ajustedPage } = PaginationButton(lostsData?.currentPage, lostsData?.totalPages)

    return (
        <div className="w-full my-10 flex flex-col justify-center items-center gap-6 text-center">
            {isLoading && isLoading ? (
                <LoadingData>Carregando items perdidos...</LoadingData>
            ) : isError ? (
                <Erro>Erro ao tentar pegar lista de itens perdidos! Por favor, tente novamente mais tarde!</Erro>
            ) : (
                (
                    <>
                        {lostsData && lostsData.losts && lostsData.losts.length === 0 && (
                            <span>Nenhum item perdido encontrado</span>
                        )}
                        <table className="w-full table-auto border-collapse border border-white-500">
                            <thead>
                                <tr className="bg-violet-500 text-xs md:text-sm lg:text-base">
                                    <th className="border px-4 py-2">Objeto</th>
                                    <th className="border px-4 py-2">Data</th>
                                    <th className="border px-4 py-2">Estado</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Ações</th>
                                </tr >
                            </thead >
                            <tbody>
                                {lostsData && lostsData.losts && lostsData.losts.length > 0 && lostsData.losts.map((lost: LostsInterface) => {

                                    const dateUTC = new Date(lost.date);

                                    dateUTC.setDate(dateUTC.getDate() + 1)

                                    const dateFormatted = new Intl.DateTimeFormat('pt-BR').format(dateUTC);

                                    return (
                                        <tr key={lost.id} className="border-b text-xs md:text-sm lg:text-base">
                                            {lost.object && lost.object.length > 15 ? (
                                                <td className="border px-4 py-2 truncate">
                                                    {`${lost.object.slice(0, 15)}...`}
                                                </td>
                                            ) : (
                                                <td className="border px-4 py-2 truncate">{lost.object}</td>
                                            )}
                                            <td className="border px-4 py-2 truncate">
                                                {dateFormatted}
                                            </td>
                                            <td className="border px-4 py-2 truncate">{lost.state}</td>
                                            <td className="border px-4 py-2 truncate">{lost.status}</td>
                                            <td className="border px-4 py-2">
                                                <div className="flex flex-col space-y-1">
                                                    {lost.deliveredTo !== null ? (
                                                        <span className="hidden">Editado</span>
                                                    ) : (
                                                        <Link
                                                            href={`${frontendURL}/${lost.id}/update`} className="cursor-pointer text-sky-500 hover:text-sky-900 transition-all duration-300"
                                                        >
                                                            Editar
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`${frontendURL}/${lost.id}`} className="cursor-pointer text-emerald-500 hover:text-emerald-900 transition-all duration-300"
                                                    >
                                                        Visualizar
                                                    </Link>
                                                    <DeleteLost id={lost.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table >
                        {lostsData && (
                            <>
                                <div className="self-end">
                                    <span>Total de items perdidos: <strong>{lostsData && lostsData.totalItems}</strong></span>
                                </div>
                                <div className="self-end">
                                    <span>Página: <strong>{lostsData && lostsData.currentPage}</strong></span>
                                </div>
                            </>
                        )}
                        <div className="flex self-end items-center gap-4">
                            {Array.from({ length: Math.min(MAX_VISIBLE_PAGES, lostsData.totalPages) }, (_, index) => {

                                const page = ajustedPage + index

                                return (
                                    <ButtonPagination
                                        key={page}
                                        pageSelected={page === lostsData.currentPage}
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