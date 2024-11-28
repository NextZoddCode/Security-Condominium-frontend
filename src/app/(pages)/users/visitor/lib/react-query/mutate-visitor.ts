// Imports
import { RegisterVisitor } from "../../hooks/post-register-visitor";
import { useMutation } from "react-query";
import { useContext } from "react";
import { messageContext } from "@/contexts/MessageContext";

export const MutateVisitor = () => {

    const { setMessageBackend } = useContext(messageContext)

    return useMutation({
        mutationFn: RegisterVisitor,
        onSuccess: () => {
            setMessageBackend('Visitante registrado com sucesso!')
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessageBackend(error.message)
            }
        }
    })

}