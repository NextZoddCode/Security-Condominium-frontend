// Imports
import { backendURL } from "../../features/utils/api-url/backend-url"

export const getPackages = async (page: number, limit: number, searchParams?: Record<string, any>) => {


    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    })

    if (searchParams) {
        Object.keys(searchParams).forEach((key, index) => {
            if (searchParams[key] && searchParams[key] !== '') {
                params.append(key, searchParams[key])
            }
        })
    }

    const response = await fetch(`${backendURL}?${params.toString()}`, {
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