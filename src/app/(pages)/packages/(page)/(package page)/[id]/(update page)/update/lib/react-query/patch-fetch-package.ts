// Imports
import { PatchPackage } from "../../hooks/patch-package";
import { useMutation, useQueryClient } from "react-query";
import { PackageUpdateInfer } from "../zod/zod";
import { useContext } from "react";
import { messageContext } from "@/contexts/MessageContext";

type PatchPackageProps = {
    data: PackageUpdateInfer,
    id: string
}

export const PatchPackageMutate = (id: string) => {

    const queryClient = useQueryClient()

    const { setMessageBackend } = useContext(messageContext)

    return useMutation(({ data, id }: PatchPackageProps) => PatchPackage(id, data), {
        onSuccess: () => {
            queryClient.invalidateQueries(['package', 'packages'])
            setMessageBackend('Encomenda atualizada com sucesso!')
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessageBackend(error.message)
            }
        }
    })

}