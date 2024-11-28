import { ScheduleProps } from "@/app/(pages)/schedule/utils/types/schedule"
import { Dispatch, SetStateAction } from "react"

export const CheckScheduleHour =
    (schedule: ScheduleProps, setMessages: Dispatch<SetStateAction<ScheduleProps[]>>): void => {

        const now = new Date()

        const [day, month, year] = schedule.date.split('/').map(Number)
        const [hora, minute] = schedule.hour.split(':').map(Number)

        const scheduleDate = new Date(year, month - 1, day, hora, minute)

        const oneHourScheduleDateAfter = new Date(scheduleDate)

        oneHourScheduleDateAfter.setHours(oneHourScheduleDateAfter.getHours() + 1)

        if (now > scheduleDate && now < oneHourScheduleDateAfter) {

            //setMessages(prevSchedules => [...prevSchedules, schedule])
            setMessages([schedule])
        }

    }