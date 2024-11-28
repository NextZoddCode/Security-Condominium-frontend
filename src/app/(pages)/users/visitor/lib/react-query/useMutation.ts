// Imports
import { GetUsersUnity } from "../../hooks/get-usersUnity";
import { useMutation } from 'react-query'

export const useMutateUnity = () => {

    return useMutation({
        mutationFn: GetUsersUnity
    })

}