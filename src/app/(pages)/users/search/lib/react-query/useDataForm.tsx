// Imports
import { SearchUserAPI } from "../../hooks/get-search-users"
import { useMutation } from "react-query"

export const useDataForm = () => {

    return useMutation({
        mutationFn: SearchUserAPI,
        mutationKey: ['users']
    })

}