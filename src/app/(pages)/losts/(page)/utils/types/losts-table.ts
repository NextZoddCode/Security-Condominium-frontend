import { Dispatch, SetStateAction } from "react"

export interface LostsInterface {
    id: string,
    object: string,
    image: string,
    description: string,
    date: string,
    status: string,
    state: string,
    deliveredTo?: string
}

export interface LostsTableInterface {
    lostsData: {
        losts: LostsInterface[],
        totalItems: number,
        currentPage: number,
        totalPages: number
    },
    isError: boolean,
    isLoading: boolean,
    setCurrentPage: Dispatch<SetStateAction<number>>
}