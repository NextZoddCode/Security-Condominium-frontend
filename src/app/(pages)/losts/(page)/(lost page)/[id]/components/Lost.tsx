'use client'

// Imports
import { LostProps } from "../../../features/utils/types/types-lost"
import { GetLostFetch } from "../lib/react-query/get-lost-fetch"
import { uploadURL } from "../../../features/utils/url/uploadURL"


//Components
import Loading from "@/components/Loading/Loading"
import Erro from "@/components/Messages/Error"

export default function Lost({ id }: { id: string }) {

    const { data, isLoading, isError } = GetLostFetch(id) as {
        data: LostProps | null,
        isLoading: boolean,
        isError: boolean
    }

    const formattedDate = data ? new Intl.DateTimeFormat('pt-BR').format(new Date(data.date)) : null

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <Erro>Erro ao tentar visualizar item perdido! Por favor, tente novamente mais tarde!</Erro>
    }

    return (
        <>
            {data && (
                <div className="flex flex-col justify-center items-center gap-8">
                    <h2 className="text-2xl font-extrabold text-center mb-6">
                        Item:
                        <span className="tracking-widest"> {data.id}</span>
                    </h2>
                    <img
                        className="w-3/4 sm:w-1/2 md:w-1/3"
                        src={`${uploadURL}/losts/${data.image}`}
                        alt={`${data.object} image`}
                    />
                    <div className="w-11/12 flex flex-col gap-2">
                        <span className="text-lg font-bold">
                            Tipo do objeto:
                            {` ${data.object}`}
                        </span>
                        <span className="text-lg font-bold">
                            Data encontrada:
                            {` ${formattedDate}`}
                        </span>
                        <span className="text-lg font-bold">
                            Estado do objeto:
                            {` ${data.state}`}
                        </span>
                        <span className="text-lg font-bold">
                            Status do objeto:
                            {` ${data.status}`}
                        </span>
                        {data.deliveredTo !== null && (
                            <span className="text-lg font-bold">
                                Entregue para:
                                {` ${data.deliveredTo}`}
                            </span>
                        )}
                        {data.description && (
                            <span className="text-lg font-bold">
                                Descrição do objeto:
                                <textarea
                                    className="w-full font-normal" rows={5}
                                    readOnly
                                    disabled
                                    value={data.description}
                                >
                                </textarea>
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}