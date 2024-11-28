// Imports
import { usersURL } from "../../../features/utils/api-url/users-url";

export const DeleteUserAPI = async (id: string) => {

    const response = await fetch(`${usersURL}/delete/${id}`, {
        method: 'DELETE',
        headers: {}
    })

    try {

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }

        return null

    } catch (error) {
        throw error
    }

};