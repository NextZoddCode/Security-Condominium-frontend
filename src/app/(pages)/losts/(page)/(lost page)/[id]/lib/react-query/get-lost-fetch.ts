// Import
import { useQuery } from "react-query";
import { GetLostAPI } from "../../hooks/get-lost-api";

export const GetLostFetch = (id: string) => {

    return useQuery({
        queryFn: () => GetLostAPI(id),
        queryKey: ['lost']
    })

}