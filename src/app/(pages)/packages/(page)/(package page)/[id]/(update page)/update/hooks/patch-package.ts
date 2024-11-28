// Imports
import { backendURL } from "@/app/(pages)/packages/features/utils/api-url/backend-url";
import { PackageUpdateInfer } from "../lib/zod/zod";

export const PatchPackage = async (id: string, body: PackageUpdateInfer) => {

    const response = await fetch(`${backendURL}/${id}/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    try {

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        return await response.json()

    } catch (error) {
        throw error
    }

};