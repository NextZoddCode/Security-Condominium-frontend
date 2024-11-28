// Imports
import { useQuery } from "react-query";
import { GetSchedules } from "../../hooks/get-schedules-api";

export const FetchDataSchedules = () => {

    return useQuery({
        queryFn: GetSchedules,
        queryKey: 'schedules'
    })

};

