'use client'

// Imports
import { getPackages } from "../../hooks/get-packages";
import { useQuery } from "react-query";
import { useState } from "react";


export const getFetchPackage = (searchParams = {}) => {

    const [currentpage, setCurrentPage] = useState<number>(1)
    const limit = 10

    const query = useQuery(['packages', currentpage, searchParams], () => getPackages(currentpage, limit, searchParams), {
        keepPreviousData: true, // Mantém os dados anteriores enquanto a nova consulta está carregando
    })

    return {
        query,
        currentpage,
        setCurrentPage
    }

}