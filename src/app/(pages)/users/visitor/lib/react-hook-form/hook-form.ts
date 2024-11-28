// Imports
import { FormPropsSchema, FormPropsType, FormPropsSchemaUser, FormPropsTypeUser } from '../zod/zodSchema'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

export const hookForm = () => {

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<FormPropsType>({
        resolver: zodResolver(FormPropsSchema)
    })

    return {
        register,
        handleSubmit,
        errors,
        getValues,
        reset
    }

}

export const hookFormUser = () => {

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<FormPropsTypeUser>({
        resolver: zodResolver(FormPropsSchemaUser)
    })

    return {
        register,
        handleSubmit,
        errors,
        getValues,
        reset
    }

}
