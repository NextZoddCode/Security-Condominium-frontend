// Imports
import { usersURL } from "../../features/utils/api-url/users-url";

export const GetUsersUnity = async (data: { unity: string }) => {

    const response = await fetch(`${usersURL}/getUnityForVisitor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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