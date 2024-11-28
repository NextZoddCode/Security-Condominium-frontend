// Imports
import { backendURL } from "../../../utils/url/backendURL";

export const GetAllCourtSchedulesAPI = async () => {

    try {

        const response = await fetch(`${backendURL}/court`, {
            method: 'GET',
            headers: {}
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }

        return response.json()

    } catch (error) {
        throw error
    }

}