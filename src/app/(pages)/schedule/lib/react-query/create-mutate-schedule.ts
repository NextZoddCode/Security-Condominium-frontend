// Imports
import { useMutation } from "react-query";
import { CreateScheduleAPI } from "../../hooks/create-schedule-api";

export const CreateMutateSchedule = () => {

    return useMutation({
        mutationFn: CreateScheduleAPI,
        mutationKey: ['schedules']
    })

}