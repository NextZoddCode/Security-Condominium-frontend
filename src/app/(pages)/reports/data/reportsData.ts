// Imports
import { UserSchema } from "../../users/features/utils/types/UserSchema"
import { PackageProps as PackageSchema } from "../../packages/features/utils/types/types-and-interfaces"
import { LostsInterface as LostsSchema } from "../../losts/(page)/utils/types/losts-table"
import { ScheduleProps, ScheduleProps as ScheduleSchema } from "../../schedule/utils/types/schedule"
import { useEffect, useState } from "react"
import { FetchDataSchedules } from "@/components/Main/lib/react-query/fetch-data"

export interface ReportsProps {
    january: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    }
    february: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    march: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    april: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    may: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    june: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    july: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    august: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    september: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    october: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    november: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    },
    december: {
        users: UserSchema[],
        packages: PackageSchema[],
        losts: LostsSchema[],
        schedules: ScheduleSchema[]
    }
}

export function DataDashboard() {

    const { data } = FetchDataSchedules()

    const [reports, setReports] = useState<ReportsProps>({
        january: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        february: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        march: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        april: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        may: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        june: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        july: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        august: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        september: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        october: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        november: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        },
        december: {
            users: [],
            packages: [],
            losts: [],
            schedules: [],
        }
    });

    const dataUserGraph = [
        {
            month: 'Jan',
            quantity: reports.january.users.length
        },
        {
            month: 'Feb',
            quantity: reports.february.users.length
        },
        {
            month: 'Mar',
            quantity: reports.march.users.length
        },
        {
            month: 'Apr',
            quantity: reports.april.users.length
        },
        {
            month: 'May',
            quantity: reports.may.users.length
        },
        {
            month: 'June',
            quantity: reports.june.users.length
        },
        {
            month: 'Jul',
            quantity: reports.july.users.length
        },
        {
            month: 'Aug',
            quantity: reports.august.users.length
        },
        {
            month: 'Sep',
            quantity: reports.september.users.length
        },
        {
            month: 'Oct',
            quantity: reports.october.users.length
        },
        {
            month: 'Nov',
            quantity: reports.november.users.length
        },
        {
            month: 'Dez',
            quantity: reports.december.users.length
        }
    ]

    const dataPackageGraph = [
        {
            month: 'Jan',
            quantity: reports.january.packages.length
        },
        {
            month: 'Feb',
            quantity: reports.february.packages.length
        },
        {
            month: 'Mar',
            quantity: reports.march.packages.length
        },
        {
            month: 'Apr',
            quantity: reports.april.packages.length
        },
        {
            month: 'May',
            quantity: reports.may.packages.length
        },
        {
            month: 'June',
            quantity: reports.june.packages.length
        },
        {
            month: 'Jul',
            quantity: reports.july.packages.length
        },
        {
            month: 'Aug',
            quantity: reports.august.packages.length
        },
        {
            month: 'Sep',
            quantity: reports.september.packages.length
        },
        {
            month: 'Oct',
            quantity: reports.october.packages.length
        },
        {
            month: 'Nov',
            quantity: reports.november.packages.length
        },
        {
            month: 'Dez',
            quantity: reports.december.packages.length
        }
    ]

    const dataLostGraph = [
        {
            month: 'Jan',
            quantity: reports.january.losts.length
        },
        {
            month: 'Feb',
            quantity: reports.february.losts.length
        },
        {
            month: 'Mar',
            quantity: reports.march.losts.length
        },
        {
            month: 'Apr',
            quantity: reports.april.losts.length
        },
        {
            month: 'May',
            quantity: reports.may.losts.length
        },
        {
            month: 'June',
            quantity: reports.june.losts.length
        },
        {
            month: 'Jul',
            quantity: reports.july.losts.length
        },
        {
            month: 'Aug',
            quantity: reports.august.losts.length
        },
        {
            month: 'Sep',
            quantity: reports.september.losts.length
        },
        {
            month: 'Oct',
            quantity: reports.october.losts.length
        },
        {
            month: 'Nov',
            quantity: reports.november.losts.length
        },
        {
            month: 'Dez',
            quantity: reports.december.losts.length
        }
    ]

    const dataScheduleGraph = [
        {
            month: 'Jan',
            quantity: reports.january.schedules.length
        },
        {
            month: 'Feb',
            quantity: reports.february.schedules.length
        },
        {
            month: 'Mar',
            quantity: reports.march.schedules.length
        },
        {
            month: 'Apr',
            quantity: reports.april.schedules.length
        },
        {
            month: 'May',
            quantity: reports.may.schedules.length
        },
        {
            month: 'June',
            quantity: reports.june.schedules.length
        },
        {
            month: 'Jul',
            quantity: reports.july.schedules.length
        },
        {
            month: 'Aug',
            quantity: reports.august.schedules.length
        },
        {
            month: 'Sep',
            quantity: reports.september.schedules.length
        },
        {
            month: 'Oct',
            quantity: reports.october.schedules.length
        },
        {
            month: 'Nov',
            quantity: reports.november.schedules.length
        },
        {
            month: 'Dez',
            quantity: reports.december.schedules.length
        }
    ]

    // Filtra os usuários e os coloca no mês correto
    useEffect(() => {

        if (data) {
            const newReports: ReportsProps = {
                january: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                february: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                march: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                april: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                may: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                june: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                july: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                august: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                september: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                october: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                november: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
                december: {
                    users: [],
                    packages: [],
                    losts: [],
                    schedules: [],
                },
            }

            data.users.forEach((user: UserSchema) => {

                if (user.createdAt) {
                    const date = new Date(user.createdAt)
                    const month = date.getMonth()

                    if (month === 0) {
                        newReports.january.users.push(user)
                    } else if (month === 1) {
                        newReports.february.users.push(user)
                    } else if (month === 2) {
                        newReports.march.users.push(user)
                    } else if (month === 3) {
                        newReports.april.users.push(user)
                    } else if (month === 4) {
                        newReports.may.users.push(user)
                    } else if (month === 5) {
                        newReports.june.users.push(user)
                    } else if (month === 6) {
                        newReports.july.users.push(user)
                    } else if (month === 7) {
                        newReports.august.users.push(user)
                    } else if (month === 8) {
                        newReports.september.users.push(user)
                    } else if (month === 9) {
                        newReports.october.users.push(user)
                    } else if (month === 10) {
                        newReports.november.users.push(user)
                    } else if (month === 11) {
                        newReports.december.users.push(user)
                    }

                }

            })

            data.packages.forEach((pack: PackageSchema) => {

                const date = new Date(pack.createdAt)
                const month = date.getMonth()

                if (month === 0) {
                    newReports.january.packages.push(pack)
                } else if (month === 1) {
                    newReports.february.packages.push(pack)
                } else if (month === 2) {
                    newReports.march.packages.push(pack)
                } else if (month === 3) {
                    newReports.april.packages.push(pack)
                } else if (month === 4) {
                    newReports.may.packages.push(pack)
                } else if (month === 5) {
                    newReports.june.packages.push(pack)
                } else if (month === 6) {
                    newReports.july.packages.push(pack)
                } else if (month === 7) {
                    newReports.august.packages.push(pack)
                } else if (month === 8) {
                    newReports.september.packages.push(pack)
                } else if (month === 9) {
                    newReports.october.packages.push(pack)
                } else if (month === 10) {
                    newReports.november.packages.push(pack)
                } else if (month === 11) {
                    newReports.december.packages.push(pack)
                }

            })

            data.losts.forEach((lost: LostsSchema) => {

                const date = new Date(lost.date)
                const month = date.getMonth()

                if (month === 0) {
                    newReports.january.losts.push(lost)
                } else if (month === 1) {
                    newReports.february.losts.push(lost)
                } else if (month === 2) {
                    newReports.march.losts.push(lost)
                } else if (month === 3) {
                    newReports.april.losts.push(lost)
                } else if (month === 4) {
                    newReports.may.losts.push(lost)
                } else if (month === 5) {
                    newReports.june.losts.push(lost)
                } else if (month === 6) {
                    newReports.july.losts.push(lost)
                } else if (month === 7) {
                    newReports.august.losts.push(lost)
                } else if (month === 8) {
                    newReports.september.losts.push(lost)
                } else if (month === 9) {
                    newReports.october.losts.push(lost)
                } else if (month === 10) {
                    newReports.november.losts.push(lost)
                } else if (month === 11) {
                    newReports.december.losts.push(lost)
                }

            })

            data.schedules.forEach((schedule: ScheduleSchema) => {

                const date = new Date(schedule.createdAt)
                const month = date.getMonth()

                if (month === 0) {
                    newReports.january.schedules.push(schedule)
                } else if (month === 1) {
                    newReports.february.schedules.push(schedule)
                } else if (month === 2) {
                    newReports.march.schedules.push(schedule)
                } else if (month === 3) {
                    newReports.april.schedules.push(schedule)
                } else if (month === 4) {
                    newReports.may.schedules.push(schedule)
                } else if (month === 5) {
                    newReports.june.schedules.push(schedule)
                } else if (month === 6) {
                    newReports.july.schedules.push(schedule)
                } else if (month === 7) {
                    newReports.august.schedules.push(schedule)
                } else if (month === 8) {
                    newReports.september.schedules.push(schedule)
                } else if (month === 9) {
                    newReports.october.schedules.push(schedule)
                } else if (month === 10) {
                    newReports.november.schedules.push(schedule)
                } else if (month === 11) {
                    newReports.december.schedules.push(schedule)
                }

            })

            setReports(newReports) // Atualiza o estado com os usuários filtrados por mês
        }
    }, [data])


    return {
        data,
        reports,
        setReports,
        dataUserGraph,
        dataPackageGraph,
        dataLostGraph,
        dataScheduleGraph
    }

}