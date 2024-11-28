// Imports
import { backendURL } from "../../features/utils/api-url/backend-url";
import { RegisterPackageInfer } from "../lib/zod/register-package-schema";


export const RegisterPackageAPI = async (data: RegisterPackageInfer) => {

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

        return await response.json()

    } catch (error) {
        throw error
    }

}