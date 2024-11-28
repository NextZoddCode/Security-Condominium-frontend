// Imports
import { backendURL } from "@/app/(pages)/losts/(page)/features/utils/url/backendURL";
import { UpdateLostProps } from "../utils/types";

export const UpdateLostAPI = async (id: string, data: UpdateLostProps) => {

    try {

        const response = await fetch(`${backendURL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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