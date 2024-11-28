// Imports
import { useMutation } from "react-query";
import { CreateLostAPI } from "../../hooks/create-lost-api";

export const mutationLost = () => {

    return useMutation({
        mutationFn: CreateLostAPI
    })

}