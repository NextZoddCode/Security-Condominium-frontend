// Imports
import { backendURL } from "../../../features/utils/url/backendURL";

export const GetLostAPI = async (id: string) => {

    try {

        const response = await fetch(`${backendURL}/${id}`, {
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