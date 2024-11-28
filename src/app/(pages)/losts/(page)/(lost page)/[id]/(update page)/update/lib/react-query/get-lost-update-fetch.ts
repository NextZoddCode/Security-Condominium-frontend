// Imports
import { useQuery } from "react-query";
import { GetLostForUpdateAPI } from "../../hooks/get-lost-for-update-api";

export const GetLostUpdateFetch = (id: string) => {

    return useQuery(['losts, lost', id], () => GetLostForUpdateAPI(id), {
        enabled: !!id,
        keepPreviousData: true
    })

}