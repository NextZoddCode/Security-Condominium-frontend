// Imports
import { useForm } from "react-hook-form";
import { SearchPackagesSchema, SearchPackageInfer } from "../zod/zod-schema-search-package";
import { zodResolver } from "@hookform/resolvers/zod";

export const HookFormPackage = () => {

    const { handleSubmit, register } = useForm<SearchPackageInfer>({
        resolver: zodResolver(SearchPackagesSchema)
    })

    return {
        handleSubmit,
        register
    }

};