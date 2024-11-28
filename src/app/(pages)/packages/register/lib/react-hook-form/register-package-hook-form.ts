// Imports
import { RegisterPackageInfer, RegisterPackageSchemaProps } from "../zod/register-package-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const PackageHookForm = () => {

    const {
        handleSubmit: handleSubmitPackage,
        register: registerPackage,
        formState: { errors: errorsPackage },
        reset: resetPackageForm
    } = useForm<RegisterPackageInfer>({
        resolver: zodResolver(RegisterPackageSchemaProps)
    })

    return {
        handleSubmitPackage,
        registerPackage,
        errorsPackage,
        resetPackageForm
    }

};