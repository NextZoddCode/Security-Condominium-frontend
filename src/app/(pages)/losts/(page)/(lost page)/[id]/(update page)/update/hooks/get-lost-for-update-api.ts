// Imports
import { backendURL } from "@/app/(pages)/losts/(page)/features/utils/url/backendURL";

export const GetLostForUpdateAPI = async (id: string) => {

    try {

        const response = await fetch(`${backendURL}/${id}/update`, {
            method: 'GET',
            headers: {}
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        return await response.json()

    } catch (error) {
        throw error
    }

}