// Imports
import { useMutation } from "react-query"
import { createUser } from "../../hooks/create-user-api"

// Função que irá retornar o mutate do react-query
export function useDataUser() {

    // Retorna direto a função useMutation do react-query
    return useMutation({
        mutationFn: createUser // Passando a createUser como resultado da mutationFunction
    })

};