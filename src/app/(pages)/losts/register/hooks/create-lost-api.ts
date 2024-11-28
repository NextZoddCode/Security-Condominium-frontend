// Imports
import { LostItemInfer } from "../lib/zod/zod"
import { backendURL } from "../features/utils/url/backend-url"

export const CreateLostAPI = async (data: {
    formData: LostItemInfer,
    selectedImage: File | string
}) => {

    const { formData, selectedImage } = data

    const formDataObject = new FormData()

    formDataObject.append('image', selectedImage)
    formDataObject.append('object', formData.object)
    formDataObject.append('description', formData.description)
    formDataObject.append('state', formData.state)
    formDataObject.append('date', formData.date)
    formDataObject.append('status', 'perdido')

    try {

        const response = await fetch(`${backendURL}/create`, {
            method: 'POST',
            headers: {},
            body: formDataObject
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