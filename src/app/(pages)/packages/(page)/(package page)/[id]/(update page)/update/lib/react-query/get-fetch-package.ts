// Imports
import { GetPackageForUpdate } from "../../hooks/get-package";
import { useQuery } from "react-query";

export const GetDataPackageForUpdate = (id: string) => {
    return useQuery(['package', id], () => GetPackageForUpdate(id))
}