// Imports
import { useQuery } from "react-query";
import { getPackage } from "../../hooks/get-package";

export const getFetchPackage = (id: string) => {

    return useQuery(['packages', id], () => getPackage(id), {
        keepPreviousData: true
    })

}