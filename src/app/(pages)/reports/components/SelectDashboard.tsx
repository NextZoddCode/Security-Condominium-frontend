import { Dispatch, SetStateAction } from "react"

interface SelectDashboardProps {
    setSelectDashboard: Dispatch<SetStateAction<string | undefined>>
}

export default function SelectDashboard({ setSelectDashboard }: SelectDashboardProps) {
    return (
        <>
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-6"
            >
                Relatórios
            </h2>
            <select
                onChange={(e) => setSelectDashboard(e.target.value)}
                className="w-72"
            >
                <option selected disabled>Selecionar</option>
                <option value="users">Usuários</option>
                <option value="packages">Encomendas</option>
                <option value="losts">Achados e perdidos</option>
                <option value="schedules">Agendamentos</option>
            </select>
        </>
    )
}