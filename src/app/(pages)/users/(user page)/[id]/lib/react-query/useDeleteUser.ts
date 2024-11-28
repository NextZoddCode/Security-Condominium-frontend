// Imports
import { DeleteUserAPI } from "../../hooks/delete-user-api"
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { messageContext } from "@/contexts/MessageContext";

export const useDeleteUser = (id: string) => {

    const queryClient = useQueryClient()

    const { setMessageBackend } = useContext(messageContext)

    const { replace } = useRouter()

    return useMutation(() => DeleteUserAPI(id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['user', id])
            replace('http://localhost:3000/users/search')
            setMessageBackend('Usuário excluído com sucesso')
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessageBackend(error.message)
            }
        }
    })

};