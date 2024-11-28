// Import
import { useMutation, useQueryClient } from "react-query";
import { DeleteLostAPI } from "../../hooks/delete-lost-api";
import { useContext } from "react";
import { messageContext } from "@/contexts/MessageContext";

export const deleteMutation = (id: string) => {

    const query = useQueryClient()

    const { setMessageBackend } = useContext(messageContext)

    return useMutation(['losts', id], () => DeleteLostAPI(id), {
        onSuccess: () => {
            query.invalidateQueries('losts')
            setMessageBackend('Item perdido excluído com sucesso!')
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessageBackend(error.message)
            }
        }
    })

}