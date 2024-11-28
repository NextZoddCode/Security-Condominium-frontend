// Imports
import { backendURL } from "../../../utils/url/backendURL";

export const DeleteScheduleAPI = async (id: string) => {

    try {

        const response = await fetch(`${backendURL}/${id}`, {
            method: 'DELETE',
            headers: {}
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

    } catch (error) {
        throw error
    }

}