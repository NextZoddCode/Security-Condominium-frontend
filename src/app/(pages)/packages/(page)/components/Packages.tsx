'use client'

// Imports
import { getFetchPackage } from "../lib/react-query/get-fetch-packages"
import { useEffect, useState, useContext } from "react"
import { messageContext } from "@/contexts/MessageContext"

//Components
import Table from "./TablePackages"
import Loading from "@/components/Loading/Loading"
import Erro from "@/components/Messages/Error"
import Form from "./Form"
import Success from "@/components/Messages/Success"


export default function Package() {

    const { messageBackend, setMessageBackend } = useContext(messageContext)

    const [searchPackagesData, setSearchPackagesData] = useState({})

    const {
        query: queryPackageFetch,
        currentpage,
        setCurrentPage
    } = getFetchPackage(searchPackagesData)

    const {
        data: dataPackages,
        isError: isErrorPackages,
        isLoading: loadingPackages,
    } = queryPackageFetch

    useEffect(() => {
        if (messageBackend !== '') {
            setTimeout(() => {
                setMessageBackend('')
            }, 5000)
        }
    }, [messageBackend])

    if (loadingPackages) {
        <Loading />
    }

    if (isErrorPackages) {
        <Erro>Erro ao carregar as encomendas</Erro>
    }

    return (
        <>
            {messageBackend && messageBackend === 'Encomenda excluída com sucesso!' && (
                <Success>Encomenda excluída com sucesso!</Success>
            )}
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-12"
            >
                Buscar por:
            </h2>
            <Form setSearchPackagesData={setSearchPackagesData} />
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-20"
            >
                Encomendas
            </h2>
            <Table
                packages={dataPackages?.packages}
                totalPages={dataPackages?.totalPages}
                totalItems={dataPackages?.totalItems}
                currentPage={currentpage}
                setCurrentPage={setCurrentPage}
                loadingPackages={loadingPackages}
                errorPackages={isErrorPackages}
            />
        </>
    )
}
