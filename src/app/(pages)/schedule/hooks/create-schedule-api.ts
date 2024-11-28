// Imports
import { backendURL } from "../utils/url/backendURL";
import { CreateScheduleProps } from "../utils/types/create-schedule-type";

export const CreateScheduleAPI = async (data: CreateScheduleProps) => {

    try {

        const response = await fetch(`${backendURL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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