// Imports
import { RegisterVisitorProps } from "../utils/types/types"
import { usersURL } from "../../features/utils/api-url/users-url"

export const RegisterVisitor = async (data: RegisterVisitorProps) => {

    try {

        const response = await fetch(`${usersURL}/visitor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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