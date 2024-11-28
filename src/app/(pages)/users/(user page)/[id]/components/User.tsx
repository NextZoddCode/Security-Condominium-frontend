'use client'

// Imports
import { useQueryData } from "../lib/react-query/useQueryData";
import { UserPageProps } from "../utils/types/user-page";
import { uploadURL } from "../../../features/utils/api-url/upload-url";
import { frontendURL } from "../../../features/utils/api-url/frontend-url";
import { useContext, useEffect } from "react";
import { messageContext } from "@/contexts/MessageContext";

// Components
import DivFlexColumnCenter from "@/components/Divs/DivFlexColumnCenter";
import DivFlexInlineCenter from "@/components/Divs/DivFlexInlineCenter";
import Success from "@/components/Messages/Success";
import Erro from "@/components/Messages/Error";
import Loading from "@/components/Loading/Loading";
import UserImage from "@/components/Images/UserImage";
import Birthday from "./Birthday";
import DeleteUser from "./DeleteUser";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from '@/components/ui/dialog'

export default function User({ params }: UserPageProps) {

    const { id } = params

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const { data, isError, isLoading } = useQueryData(id)

    // Inicialize dataUnits com um array vazio
    let dataUnits = [];

    if (data && data.units) {
        try {
            // Checa se data.units é uma string antes de tentar fazer o parsing
            if (typeof data.units === 'string') {
                // data.units vem como string JSON do backend, então deve-se transformar em objeto javascript
                dataUnits = JSON.parse(data.units);
            } else {
                console.error("data.units não é uma string válida:", data.units);
            }
        } catch (error) {
            console.error("Erro ao parsear data.units:", error);
        }
    }

    useEffect(() => {
        if (messageBackend !== '') {
            setTimeout(() => {
                setMessageBackend('')
            }, 10000)
        }
    }, [messageBackend])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (isError) {
        return (
            <Erro>Erro ao carregar usuário</Erro>
        )
    }

    return (
        <>
            {data && (
                <DivFlexInlineCenter>
                    <DivFlexColumnCenter>
                        {messageBackend && messageBackend === 'Usuário atualizado com sucesso!' && (
                            <Success>{messageBackend.toString()}</Success>
                        )}
                        {messageBackend && messageBackend !== '' && messageBackend !== 'Usuário atualizado com sucesso!' && (
                            <Erro>{messageBackend.toString()}</Erro>
                        )}
                        <div className="flex flex-col justify-center items-center gap-8 mt-16 mb-16">
                            <Link
                                href={`${frontendURL}/search`}
                                className="text-xl text-violet-500 font-bold hover:text-violet-800 transition-colors duration-300"
                            >
                                Voltar para buscas
                            </Link>
                            <h2 className="tracking-wide text-2xl font-bold md:text-3xl lg:text-4xl">
                                {data.name}
                            </h2>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        type="button"
                                        className="font-medium"
                                    >Ampliar imagem</button>
                                </DialogTrigger>
                                <DialogContent
                                    className="border-none"
                                >
                                    <DialogHeader>
                                        <DialogTitle>{/*data.name*/}</DialogTitle>
                                        <DialogDescription>
                                            <UserImage
                                                className="h-[500px]"
                                                src={`${uploadURL}/${data.image}`}
                                                alt={`User: ${data.name}`}
                                            />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                            <UserImage
                                id='userImage'
                                src={`${uploadURL}/${data.image}`}
                                alt={`User: ${data.name}`}
                            />
                            <div className="flex flex-col gap-4">
                                <p
                                    className="text-xl font-medium"
                                >
                                    Unidade(s):
                                    {dataUnits && dataUnits.length > 0 &&
                                        dataUnits.map((unit: { unity: string }, index: number) => (
                                            <span
                                                key={index}
                                            >
                                                {` ${unit.unity}`}
                                                {index < dataUnits.length - 1 && ' / '}
                                            </span>
                                        ))}
                                </p>
                                <p className="text-xl font-medium">
                                    Propietário: {data.owner ? (
                                        <span>Sim</span>
                                    ) : (
                                        <span>Não</span>
                                    )}
                                </p>
                                <p className="text-xl font-medium">E-mail: {data.email}</p>
                                <p className="text-xl font-medium">Documento: {data.document}</p>
                                <p className="text-xl font-medium">Telefone: {data.tel}</p>
                                <Birthday date={data.date} />
                                <div className="flex  items-center gap-10">
                                    <Link href={`${frontendURL}/${data.id}/update`}>
                                        <BiEditAlt
                                            className="text-sky-500 cursor-pointer"
                                            size={40}
                                        />
                                    </Link>
                                    <DeleteUser userId={data.id} />
                                </div>
                            </div>
                        </div>
                    </DivFlexColumnCenter >
                </DivFlexInlineCenter >
            )}
        </>
    )
}