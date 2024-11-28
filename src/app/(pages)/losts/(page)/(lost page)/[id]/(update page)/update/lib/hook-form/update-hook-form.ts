// Imports
import { UpdateLostSchema, UpdateLostInfer } from "../zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const UpdateHookForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateLostInfer>({
        resolver: zodResolver(UpdateLostSchema)
    })

    return {
        register,
        handleSubmit,
        errors
    }

}