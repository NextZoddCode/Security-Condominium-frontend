'use client'

// Imports
import { DeletePackageMutate } from '../lib/react-query/delete-fetch-package'

// Components
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter } from '@/components/ui/alert-dialog'
import ErrorMessage from '@/components/Messages/FormErrorMessage'

export default function DeletePackage({ id }: { id: string }) {

    const { mutate, isError, isLoading } = DeletePackageMutate(id)

    function deleteUser() {
        mutate()
    }

    if (isLoading) {
        return <ErrorMessage>Excluindo...</ErrorMessage>
    }

    if (isError) {
        return <ErrorMessage>Erro!</ErrorMessage>
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <span className='text-red-500 hover:text-red-900 transition-all duration-300'>
                    Excluir
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-violet-500 text-white w-3/4">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Você tem certeza disso?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Se fizer isto, irá excluir a encomenda!
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