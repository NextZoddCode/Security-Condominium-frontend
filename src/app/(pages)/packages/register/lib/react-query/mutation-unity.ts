// Imports
import { useMutation } from "react-query"
import { GetUnityAPI } from "../../hooks/get-unity-api"

export const MutationUnity = () => {

    return useMutation({
        mutationFn: GetUnityAPI
    })

}