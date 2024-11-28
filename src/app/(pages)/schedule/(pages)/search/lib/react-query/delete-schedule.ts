// Import
import { DeleteScheduleAPI } from "../../hooks/delete-schedule-api";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { messageContext } from "@/contexts/MessageContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { ScheduleProps } from "@/app/(pages)/schedule/utils/types/schedule";

export const DeleteScheduleMutate = (
    id: string,
    setMessagesSchedules?: Dispatch<SetStateAction<ScheduleProps[]>>
) => {

    const query = useQueryClient()

    const { setMessageBackend } = useContext(messageContext)

    return useMutation((['schedules', id]), () => DeleteScheduleAPI(id), {
        onSuccess: () => {
            query.invalidateQueries('schedules')
            setMessageBackend('Agendamento excluído com sucesso!')
            if (setMessagesSchedules) {
                setMessagesSchedules((prevSchedules) =>
                    prevSchedules.filter(schedule => schedule.id !== id)
                )
            }
        },
        onError: (error) => {
            if (error instanceof Error) {
                setMessageBackend(error.message)
            }
        }
    })

}