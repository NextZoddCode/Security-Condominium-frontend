// Imports

export const GetSchedules = async () => {

    try {

        const response = await fetch('http://localhost:5000/messages', {
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