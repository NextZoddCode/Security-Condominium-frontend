// Imports

export interface UpdateScheduleProps {
    verify?: string
}

export const UpdateScheduleAPI = async (id: string, data: UpdateScheduleProps): Promise<void> => {

    try {
        const response = await fetch(`http://localhost:5000/messages/schedule/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

    } catch (error) {
        throw error
    }

}