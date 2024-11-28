// Imports
import { useQueryClient, useMutation } from "react-query";
import { UpdateLostAPI } from "../../hooks/update-lost-api";
import { UpdateLostProps } from "../../utils/types";
import { useContext } from "react";
import { messageContext } from "@/contexts/MessageContext";


interface UpdateMutateProps {
    id: string,
    body: UpdateLostProps
}


export const UpdateMutate = (id: string) => {


    const { setMessageBackend } = useContext(messageContext)

    const query = useQueryClient()

    return useMutation(({ id, body }: UpdateMutateProps) => UpdateLostAPI(id, body), {
        onSuccess: () => {
            query.invalidateQueries(['losts', 'lost'])
            setMessageBackend('Item perdido atualizado com sucesso!')
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessageBackend(error.message)
            }
        }
    })

}