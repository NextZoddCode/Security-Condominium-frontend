// Imports
import { useMutation } from "react-query";
import { RegisterPackageAPI } from "../../hooks/register-package-api";

export const MutatePackage = () => {

    return useMutation({
        mutationFn: RegisterPackageAPI
    })

}