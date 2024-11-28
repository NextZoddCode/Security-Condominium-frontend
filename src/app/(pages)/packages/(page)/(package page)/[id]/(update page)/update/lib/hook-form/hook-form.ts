// Imports
import { PackageUpdateInfer, PackageUpdateSchema } from "../zod/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const hookForm = () => {

    const { handleSubmit, register, formState: { errors } } = useForm<PackageUpdateInfer>({
        resolver: zodResolver(PackageUpdateSchema)
    })

    return {
        handleSubmit,
        register,
        errors
    }

}