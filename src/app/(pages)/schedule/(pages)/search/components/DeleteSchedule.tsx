// Imports
import { DeleteScheduleMutate } from '../lib/react-query/delete-schedule'

// Components
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter } from '@/components/ui/alert-dialog'
import ErrorMessage from "@/components/Messages/FormErrorMessage"
import { Dispatch, SetStateAction } from 'react'
import { ScheduleProps } from '../../../utils/types/schedule'

interface DeleteScheduleProps {
    id: string,
    setMessagesSchedules?: Dispatch<SetStateAction<ScheduleProps[]>>
}

export default function DeleteSchedule({ id, setMessagesSchedules }: DeleteScheduleProps) {

    const { mutate, isError } = DeleteScheduleMutate(id, setMessagesSchedules)

    if (isError) {
        return <ErrorMessage>Erro ao tentar excluir agendamento!</ErrorMessage>
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className='mt-2'>
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
                        Se fizer isto, irá excluir o agendamento!
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="border-none ring-1 ring-white lg:ring-0 hover:scale-110 hover:ring-1 hover:ring-white hover:transition-all hover:duration-300">
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => mutate()}
                            className="hover:scale-110 hover:ring-1 hover:ring-white hover:transition-all hover:duration-300">
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}