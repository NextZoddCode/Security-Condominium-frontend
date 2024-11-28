// Imports
import { useQueryClient, useMutation } from "react-query";
import { UpdateScheduleAPI } from "../../hooks/update-schedule-api";
import { UpdateScheduleProps } from "../../hooks/update-schedule-api";

interface MutateScheduleProps {
    id: string,
    data: UpdateScheduleProps
}

export const UpdateScheduleVerify = () => {

    const query = useQueryClient()

    return useMutation(({ id, data }: MutateScheduleProps) => UpdateScheduleAPI(id, data), {
        onSuccess: () => {
            query.invalidateQueries('schedules')
        }
    })

}