//Imports
import { FormPropsInfer, FormPropsSchema } from '../zod/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'

export const hookForm = () => {

    const { handleSubmit, register, control, getValues, reset } = useForm<FormPropsInfer>({
        resolver: zodResolver(FormPropsSchema)
    })

    const { fields, append } = useFieldArray({
        control,
        name: 'units'
    })

    const addUnity = () => {
        append({ unity: 0 })
    }

    return {
        handleSubmit,
        register,
        fields,
        addUnity,
        getValues,
        reset
    }

}