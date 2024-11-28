// Imports
import { FormPropsInfer } from '../lib/zod/zod'

export const SearchUserAPI = async (data: FormPropsInfer) => {

    const response = await fetch('http://localhost:5000/users/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Adicione os cabeçalhos para JSON
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