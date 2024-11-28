'use client'

// Imports
import { userAPI } from "../../hooks/user-api";
import { useQuery } from "react-query";

export const useQueryData = (id: string) => {

    return useQuery(['user', id], () => userAPI(id), {
        enabled: !!id // Apenas executa a query se o id for verdadeiro
    })

}