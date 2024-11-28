// Imports
import { DeletePackage } from "../../hooks/delete-package";
import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import { messageContext } from "@/contexts/MessageContext";

export const DeletePackageMutate = (id: string) => {

    const { setMessageBackend } = useContext(messageContext)

    const query = useQueryClient()

    return useMutation(() => DeletePackage(id), {
        onSuccess: () => {
            query.invalidateQueries('packages')
            setMessageBackend('Encomenda excluída com sucesso!')
        }
    })

}