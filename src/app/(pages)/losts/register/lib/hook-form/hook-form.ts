// Imports
import { useForm } from "react-hook-form";
import { LostItemSchema, LostItemInfer } from "../zod/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LostHookForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LostItemInfer>({
        resolver: zodResolver(LostItemSchema)
    })

    return {
        register,
        handleSubmit,
        errors,
        reset
    }

}