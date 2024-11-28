// Imports
import { backendURL } from "@/app/(pages)/packages/features/utils/api-url/backend-url"

export const getPackage = async (id: string) => {

    const response = await fetch(`${backendURL}/${id}`, {
        method: 'GET',
        headers: {}
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

}