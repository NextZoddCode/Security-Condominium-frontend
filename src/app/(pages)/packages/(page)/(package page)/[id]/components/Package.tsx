'use client'

// Imports
import { getFetchPackage } from "../lib/react-query/get-fetch-package"
import { PackageProps } from "@/app/(pages)/packages/features/utils/types/types-and-interfaces"
import { frontendURL } from "@/app/(pages)/packages/features/utils/api-url/frontend-url";

// Components
import Loading from "@/components/Loading/Loading";
import Erro from "@/components/Messages/Error";
import Link from "next/link";

export default function Package({ id }: { id: string }) {


    const { data, isError, isLoading } = getFetchPackage(id) as {
        data: PackageProps | null;
        isError: boolean;
        isLoading: boolean
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError) {
        return (
            <Erro>Erro ao carregar encomenda</Erro>
        )
    }

    return (
        <>
            {data && (
                <div
                    className="w-full my-10 flex flex-col gap-6"
                >
                    <Link
                        href={`${frontendURL}`}
                        className="text-lg text-center text-violet-500 font-bold tracking-wide hover:text-violet-900 transition-all duration-400"
                    >
                        Voltar
                    </Link>
                    <h2 className="text-2xl font-extrabold text-center mb-6">
                        Pacote:
                        <span className="tracking-widest"> {data.id}</span>
                    </h2>
                    <span className="text-lg">
                        <strong>Destinatário: </strong>
                        <input
                            className="read-only:text-black cursor-not-allowed"
                            type="text" value={data.recipient}
                        />
                    </span>
                    <span className="text-lg">
                        <strong>Código: </strong>
                        <input
                            className="read-only:text-black cursor-not-allowed"
                            type="text" value={data.packageCode}
                        />
                    </span>
                    <span className="text-lg">
                        <strong>Unidade: </strong>
                        <input
                            className="read-only:text-black cursor-not-allowed"
                            type="text" value={data.userUnity}
                        />
                    </span>
                    <span className="text-lg">
                        <strong>Cadastrado em: </strong>
                        <input
                            className="read-only:text-black cursor-not-allowed"
                            type="text" value={data.createdAt}
                        />
                    </span>
                    {data.transporter === null ? (
                        <span className="text-lg">
                            <strong>Transportadora: </strong>
                            <input
                                className="read-only:text-black cursor-not-allowed"
                                type="text" value='Não registrado'
                            />
                        </span>
                    ) : (
                        <span className="text-lg">
                            <strong>Transportadora: </strong>
                            <input
                                className="read-only:text-black cursor-not-allowed"
                                type="text" value={data.transporter}
                            />
                        </span>
                    )}
                    {data.status === 'Aguardando' ? (
                        <span className="text-lg">
                            <strong>Status: </strong>
                            <input
                                className="read-only:text-black cursor-not-allowed"
                                type="text" value={data.status}
                            />
                        </span>
                    ) : (
                        <>
                            <span className="text-lg">
                                <strong>Status: </strong>
                                <input
                                    className="read-only:text-black cursor-not-allowed"
                                    type="text" value={data.status}
                                />
                            </span >
                            <span className="text-lg">
                                <strong>Entregue para: </strong>
                                <input
                                    className="read-only:text-black cursor-not-allowed"
                                    type="text" value={data.deliveredTo}
                                />
                            </span >
                        </>
                    )}
                </div>
            )}
        </>
    )
}