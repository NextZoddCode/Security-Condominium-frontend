// Imports
import { usersURL } from "../../../features/utils/api-url/users-url";

export const userAPI = async (id: string) => {

    const response = await fetch(`${usersURL}/${id}`, {
        method: 'GET'
    })

    try {

        if (!response.ok) {
            const error = await response.text()
            throw new Error(error)
        }

        const responseText = await response.text(); // Lê o corpo como texto
        return responseText ? await JSON.parse(responseText) : null; // Faz o parsing apenas se houver conteúdo

    } catch (error) {
        throw error
    }
};