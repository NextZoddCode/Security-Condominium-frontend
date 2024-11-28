'use client'

// Imports

import { useEffect, useState } from "react";
import { FetchDataSchedules } from "./lib/react-query/fetch-data";
import { CheckScheduleHour } from "./helpers/CheckScheduleHour";
import { ScheduleProps } from "@/app/(pages)/schedule/utils/types/schedule";
import { UpdateScheduleVerify } from "./lib/react-query/mutate-data";

// Components
import { FaRegMessage } from "react-icons/fa6";
import DeleteSchedule from "@/app/(pages)/schedule/(pages)/search/components/DeleteSchedule";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Main({ children }: { children: React.ReactNode }) {

    const [messagesSchedules, setMessagesSchedules] = useState<ScheduleProps[]>([])

    const { mutate } = UpdateScheduleVerify()

    const { data } = FetchDataSchedules()

    const updateVerify = {
        verify: 'true'
    }

    useEffect(() => {

        if (data && data.schedules) {
            data.schedules.forEach((schedule: ScheduleProps) => {
                CheckScheduleHour(schedule, setMessagesSchedules)
            })
        }

    }, [data])

    return <main className="w-full lg:w-4/5 px-4 relative">
        <div className="absolute right-5 mt-5">

            <div className="relative z-50">
                {messagesSchedules && messagesSchedules.some((message: any) => message.verify === 'false') ? (
                    <>
                        <span className="absolute ml-3 text-lg animate-bounce">!</span>
                    </>
                ) : (
                    <>
                        <span className="absolute ml-3 text-lg animate-bounce"></span>
                    </>
                )
                }
                <Sheet>
                    <SheetTrigger asChild>
                        {messagesSchedules && messagesSchedules.some((message: any) => message.verify === 'false') ? (
                            <FaRegMessage className="cursor-pointer animate-bounce" size={30} />
                        ) : (
                            <FaRegMessage className="cursor-pointer" size={30} />
                        )}
                    </SheetTrigger>
                    <SheetContent className="bg-white">
                        <SheetHeader>
                            <SheetTitle className="text-center">Mensagens</SheetTitle>
                            <SheetDescription className="">
                                {messagesSchedules && messagesSchedules.length > 0 && messagesSchedules.map((schedule: ScheduleProps) => {

                                    function updateMessageAndVerify() {
                                        mutate({ id: schedule.id, data: updateVerify })
                                    }

                                    return (
                                        <>
                                            {schedule.verify === 'false' && (
                                                <div
                                                    key={schedule.id}
                                                    className="flex justify-between items-center px-2 py-2 bg-violet-500 text-white border-2 border-violet-500 rounded-xl"
                                                >
                                                    {schedule.user} está neste momento na {schedule.location}?
                                                    <div className="flex flex-col justify-between items-center gap-1">
                                                        <button onClick={() => updateMessageAndVerify()}>
                                                            Sim
                                                        </button>
                                                        <DeleteSchedule id={schedule.id} setMessagesSchedules={setMessagesSchedules} />
                                                    </div>
                                                </div>

                                            )
                                            }
                                        </>
                                    )
                                })}
                                {messagesSchedules && (messagesSchedules.length === 0 || !messagesSchedules.some(schedule => schedule.verify === 'false')) && (
                                    <span className="text-center">Não há mensagens no momento!</span>
                                )}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
        {children}
    </main>;
}
