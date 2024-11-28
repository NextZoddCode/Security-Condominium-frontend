'use client'
// Imports
import { useEffect, useState } from "react"
import { GetLostsQuery } from "../lib/react-query/get-losts"
import { useContext } from "react"
import { messageContext } from "@/contexts/MessageContext"

// Components
import Form from "./Form"
import LostsTable from "./LostsTable"
import Success from "@/components/Messages/Success"
import Erro from "@/components/Messages/Error"

export default function Losts() {

    const [queryParams, setQueryParams] = useState({})

    const { query: losts_data, currentPage, setCurrentPage } = GetLostsQuery(queryParams)

    const { data, isLoading, isError } = losts_data

    const { messageBackend, setMessageBackend } = useContext(messageContext)


    useEffect(() => {
        setTimeout(() => {
            if (messageBackend && messageBackend !== '') {
                setMessageBackend('')
            }
        }, 5000)
    }, [messageBackend])

    return (
        <>
            {messageBackend && messageBackend === 'Item perdido excluído com sucesso!' && (
                <Success>{messageBackend}</Success>
            )}
            {messageBackend && messageBackend === 'Item perdido atualizado com sucesso!' && (
                <Success>{messageBackend}</Success>
            )}
            {messageBackend instanceof Error && (
                <Erro>{messageBackend.toString()}</Erro>
            )}
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-12"
            >
                Buscar por:
            </h2>
            <Form setQueryParams={setQueryParams} />
            <LostsTable lostsData={losts_data.data} isError={isError} isLoading={isLoading} setCurrentPage={setCurrentPage} />
        </>
    )
}