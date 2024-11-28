// Imports
import { backendURL } from "../../../utils/url/backendURL";

export const GetAllPoolSchedulesAPI = async () => {

    try {

        const response = await fetch(`${backendURL}/pool`, {
            method: 'GET',
            headers: {}
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        return response.json()

    } catch (error) {
        throw error
    }


}