// Imports
import { GetAllPoolSchedulesAPI } from "../../hooks/get-all-pool-schedules-api";
import { useQuery } from "react-query";

export const GetFetchPoolSchedules = () => {

    return useQuery({
        queryFn: GetAllPoolSchedulesAPI,
        queryKey: ['schedules']
    })

}