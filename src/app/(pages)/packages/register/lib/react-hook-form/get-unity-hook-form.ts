// Imports
import { useForm } from "react-hook-form";
import { GetUnitySchemaProps, GetUnitySchemaInfer } from "../zod/get-unity-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const GetUnityHookForm = () => {

    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<GetUnitySchemaInfer>({
        resolver: zodResolver(GetUnitySchemaProps)
    })

    return {
        register,
        handleSubmit,
        errors,
        getValues,
        reset
    }

}