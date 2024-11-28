// Imports
import { useQuery } from "react-query";
import { GetLostItemsAPI } from "../../hooks/get-lost-api";
import { useState } from "react";

export const GetLostsQuery = (searchParams = {}) => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const limit = 10

    const query = useQuery((['losts', currentPage, searchParams]), () => GetLostItemsAPI(currentPage, limit, searchParams), {
        keepPreviousData: true
    })

    return {
        query,
        currentPage,
        setCurrentPage
    }

}