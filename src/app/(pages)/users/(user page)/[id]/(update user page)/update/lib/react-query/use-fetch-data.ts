'use client'

// Imports
import { GetUserAPI } from "../../hooks/get-user-api"
import { useQuery } from "react-query"


export const useFetchData = (id: string) => {

    return useQuery(['user', id], () => GetUserAPI(id), {
        enabled: !!id
    })

}