// Imports
import { useForm } from "react-hook-form";
import { LostSchema, LostSchemaInfer } from "../zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LostHookFormPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LostSchemaInfer>({
        resolver: zodResolver(LostSchema)
    })

    return {
        register,
        handleSubmit,
        errors
    }

}