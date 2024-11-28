// Imports
import { useDeleteUser } from "../lib/react-query/useDeleteUser";

//Components
import { BsTrash } from "react-icons/bs";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction
} from '@/components/ui/alert-dialog'
import ErrorMessage from "@/components/Messages/FormErrorMessage";

export default function DeleteUser({ userId }: { userId: string }) {

    const { mutate, isError, isLoading } = useDeleteUser(userId)

    function deleteUser() {
        mutate()
    }

    if (isLoading) {
        return <ErrorMessage>Excluindo...</ErrorMessage>
    }

    if (isError) {
        return <ErrorMessage>Erro ao excluir!</ErrorMessage>
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <BsTrash
                    className="text-red-500 cursor-pointer"
                    size={30}
                />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-violet-500 text-white w-3/4">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Você tem certeza disso?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Se fizer isto, irá excluir o usuário!
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="border-none ring-1 ring-white lg:ring-0 hover:scale-110 hover:ring-1 hover:ring-white hover:transition-all hover:duration-300">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteUser()}
                            className="hover:scale-110 hover:ring-1 hover:ring-white hover:transition-all hover:duration-300">
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}