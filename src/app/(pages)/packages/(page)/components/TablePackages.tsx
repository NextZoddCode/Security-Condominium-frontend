//Imports
import { PaginationButton } from "../helpers/pagination-button"
import { Dispatch, SetStateAction } from "react"
import { frontendURL } from "../../features/utils/api-url/frontend-url"

//Components
import Link from "next/link"
import ButtonPagination from "@/components/Buttons/ButtonPagination"
import LoadingData from "@/components/Loading/LoadingData"
import DeletePackage from "./DeletePackage"
import Erro from "@/components/Messages/Error"

//Types
import { PackageProps } from "../../features/utils/types/types-and-interfaces"

export default function Table(
    {
        packages,
        totalPages,
        currentPage,
        setCurrentPage,
        loadingPackages,
        errorPackages,
        totalItems
    }:
        {
            packages: PackageProps[],
            totalItems: number,
            totalPages: number,
            currentPage: number,
            setCurrentPage: Dispatch<SetStateAction<number>>,
            loadingPackages: boolean,
            errorPackages: boolean
        }) {

    const {
        MAX_VISIBLE_PAGES,
        ajustedPage
    } = PaginationButton(currentPage, totalPages)

    let packDate: Date
    let formatedData: string

    return (
        <div className="w-full my-10 flex flex-col justify-center items-center gap-6 text-center">
            {loadingPackages && loadingPackages ? (
                <LoadingData>Carregando encomendas...</LoadingData>
            ) : errorPackages ? (
                <Erro>Erro ao tentar carregar encomendas! Por favor, tente novamente mais tarde</Erro>
            ) : (
                <>
                    {packages && packages.length === 0 && (
                        <span>Nenhuma encomenda encontrada</span>
                    )}
                    <table className="w-full table-auto border-collapse border border-white-500">
                        <thead>
                            <tr className="bg-violet-500 text-xs md:text-sm lg:text-base">
                                <th className="border px-4 py-2">Data</th>
                                <th className="border px-4 py-2">Para</th>
                                <th className="border px-4 py-2">Código</th>
                                <th className="border px-4 py-2 hidden sm:table-cell">Unidade</th>
                                <th className="border px-4 py-2">Entregue Para</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Ações</th>
                            </tr >
                        </thead >
                        <tbody>
                            {packages && packages.length > 0 && packages.map((pack: PackageProps) => {

                                packDate = new Date(pack.createdAt)
                                formatedData = new Intl.DateTimeFormat('pt-BR').format(packDate)

                                return (
                                    <tr key={pack.id} className="border-b text-xs md:text-sm lg:text-base">
                                        <td className="border px-4 py-2 truncate">
                                            {formatedData}
                                        </td>
                                        <td className="border px-4 py-2 truncate">{pack.recipient}</td>
                                        <td className="border px-4 py-2">
                                            {/* Exibe o texto truncado apenas em telas pequenas */}
                                            <span className="block md:hidden truncate">
                                                {pack.packageCode.length > 5 ? `${pack.packageCode.slice(0, 5)}...` : pack.packageCode}
                                            </span>
                                            {/* Exibe o texto completo apenas em telas grandes */}
                                            < span className="hidden md:block" >
                                                {
                                                    pack.packageCode.length > 20
                                                        ? `${pack.packageCode.slice(0, 20)}...`
                                                        : pack.packageCode
                                                }
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2 truncate hidden sm:table-cell">{pack.userUnity || "-"}</td>
                                        <td className="border px-4 py-2 truncate">{pack.deliveredTo || "-"}</td>
                                        <td className="border px-4 py-2 truncate">{pack.status}</td>
                                        <td className="border px-4 py-2">
                                            <div className="flex flex-col space-y-1">
                                                {pack.deliveredTo === null && (
                                                    <Link
                                                        href={`${frontendURL}/${pack.id}/update`} className="cursor-pointer text-sky-500 hover:text-sky-900 transition-all duration-300"
                                                    >
                                                        Editar
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`${frontendURL}/${pack.id}`} className="cursor-pointer text-emerald-500 hover:text-emerald-900 transition-all duration-300"
                                                >
                                                    Visualizar
                                                </Link>
                                                <DeletePackage id={pack.id} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table >
                    <div className="self-end">
                        <span>Total de encomendas: <strong>{totalItems}</strong></span>
                    </div>
                    <div className="self-end">
                        <span>Página: <strong>{currentPage}</strong></span>
                    </div>
                    <div className="flex self-end items-center gap-4">
                        {Array.from({ length: Math.min(MAX_VISIBLE_PAGES, totalPages) }, (_, index) => {
                            const page = ajustedPage + index
                            return (
                                <ButtonPagination
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    pageSelected={page === currentPage}
                                >
                                    {page}
                                </ButtonPagination>
                            )
                        })}
                    </div>
                </>
            )
            }
        </div >
    )
}