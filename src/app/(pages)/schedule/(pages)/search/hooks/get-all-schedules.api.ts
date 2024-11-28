// Imports
import { backendURL } from "../../../utils/url/backendURL";

export const GetAllSchedulesAPI = async (page: number, limit: number, searchParams?: Record<string, any>) => {

    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    })

    if (searchParams) {
        Object.keys(searchParams).forEach((key, index) => {
            if (key && key !== '') {
                params.append(key, searchParams[key])
            }
        })
    }

    try {

        const response = await fetch(`${backendURL}/search?${params.toString()}`, {
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