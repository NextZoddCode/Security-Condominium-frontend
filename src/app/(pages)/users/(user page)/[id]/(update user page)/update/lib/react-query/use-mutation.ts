'use client'

// Imports
import { useMutation } from "react-query";
import { UpdateUserAPI } from "../../hooks/update-user-api";
import { FormPropsType } from "../zod/zod";
import { useContext } from "react";
import { useRouter } from 'next/navigation'
import { frontendURL } from "@/app/(pages)/users/features/utils/api-url/frontend-url";

// Contexts
import { messageContext } from "@/contexts/MessageContext";

// Types

// Define o tipo para os parâmetros da mutação
type UpdateUserParams = {
    data: FormPropsType;
    id: string;
};

export const useMutationData = (id: string) => {

    const { setMessageBackend } = useContext(messageContext)

    const { replace } = useRouter()

    // A função mutate precisa receber os dados e o id
    return useMutation(
        // A função mutate precisa aceitar um objeto com os dados e o ID
        ({ data, id }: UpdateUserParams) => UpdateUserAPI(data, id),
        {
            onSuccess: () => {
                setMessageBackend('Usuário atualizado com sucesso!')
                replace(`${frontendURL}/${id}`)

            },
            onError: (error) => {
                if (error instanceof Error) {
                    setMessageBackend(error.message)
                }
            }
        })

};