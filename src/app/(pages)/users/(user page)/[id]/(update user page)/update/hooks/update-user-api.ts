// Imports
import { usersURL } from "@/app/(pages)/users/features/utils/api-url/users-url"
import { FormPropsType } from "../lib/zod/zod"

export const UpdateUserAPI = async (data: FormPropsType, id: string) => {

    const formData = new FormData()

    formData.append('name', data.name)
    formData.append('owner', data.owner.toString())
    formData.append('email', data.email)
    formData.append('document', data.document.toString())
    formData.append('tel', data.tel.toString())
    formData.append('date', data.date)
    formData.append('units', JSON.stringify(data.units))

    // Verifica se o usuário alterou a foto ou não, se não alterou, continuará com o mesmo string de nome no backend, porém, se alterou, a função abaixo checa se é um FileList, e se for, ele pega o primeiro indice do FileList, tornando data.image um File, assim enviando um file para o backend.
    if (data.image instanceof FileList) {
        formData.append('image', data.image[0])
    } else if (data.image === 'string') {
        formData.append('image', data.image)
    }

    try {

        const response = await fetch(`${usersURL}/${id}/update`, {
            method: 'PATCH',
            headers: {},
            body: formData
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