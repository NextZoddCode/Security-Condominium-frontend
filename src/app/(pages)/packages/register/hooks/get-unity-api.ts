// Imports
import { GetUnitySchemaInfer } from "../lib/zod/get-unity-schema"
import { usersURL } from "@/app/(pages)/users/features/utils/api-url/users-url"


export const GetUnityAPI = async (data: GetUnitySchemaInfer) => {

    try {

        const response = await fetch(`${usersURL}/getUnityForVisitor`, {
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

        return await response.json()

    } catch (error) {
        throw error
    }

}