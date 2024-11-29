'use client'

// Imports
import { DataDashboard } from "./data/reportsData"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


// Components
import Dashboard from "./components/Dashboard"
import SelectDashboard from "./components/SelectDashboard"

export default async function Page() {

    const { data: session } = useSession()

    if (!session) {
        // Redireciona para a página de login do NextAuth
        redirect('/api/auth/signin')
    }

    const { dataUserGraph, dataPackageGraph, dataLostGraph, dataScheduleGraph } = DataDashboard()

    const [selectDashboard, setSelectDashboard] = useState<string>()

    return (
        <>
            <div className="flex flex-col justify-center items-center gap-10 my-10">
                <SelectDashboard setSelectDashboard={setSelectDashboard} />

                {selectDashboard === 'users' && <Dashboard dataGraph={dataUserGraph} textGraph="Gráfico de cadastro de usuários mensal" />}

                {selectDashboard === 'packages' && <Dashboard dataGraph={dataPackageGraph} textGraph="Gráfico de cadastro de encomendas mensal" />}

                {selectDashboard === 'losts' && <Dashboard dataGraph={dataLostGraph} textGraph="Gráfico de cadastro de achados e perdidos mensal" />}

                {selectDashboard === 'schedules' && <Dashboard dataGraph={dataScheduleGraph} textGraph="Gráfico de cadastro de agendamentos de esportes mensal" />}
            </div >
        </>

    )
}