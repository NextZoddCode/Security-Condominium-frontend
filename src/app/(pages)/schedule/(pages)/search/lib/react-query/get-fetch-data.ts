// Imports
import { useQuery } from "react-query";
import { GetAllSchedulesAPI } from "../../hooks/get-all-schedules.api";
import { useState } from "react";


export const GetFetchSchedulesData = (searchParams = {}) => {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const limit = 10

    const query = useQuery((['schedules', currentPage, searchParams]), () => GetAllSchedulesAPI(currentPage, limit, searchParams), {
        keepPreviousData: true
    })

    return {
        query,
        currentPage,
        setCurrentPage
    }

}