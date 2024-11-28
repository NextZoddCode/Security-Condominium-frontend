// Imports
import { GetAllCourtSchedulesAPI } from "../../hooks/get-all-court-schedules-api";
import { useQuery } from "react-query";

export const GetFetchCourtSchedules = () => {

    return useQuery({
        queryFn: GetAllCourtSchedulesAPI,
        queryKey: ['schedules']
    })

}