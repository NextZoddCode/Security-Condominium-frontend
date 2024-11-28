// Imports
import { backendURL } from "../../features/utils/api-url/backend-url";

export const DeletePackage = async (id: string) => {

    const response = await fetch(`${backendURL}/${id}/delete`, {
        method: 'DELETE',
        headers: {}
    })

    try {

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

    } catch (error) {
        throw error
    }

}