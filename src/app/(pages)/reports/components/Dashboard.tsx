'use client'

// Imports
import { DataDashboard } from '../data/reportsData';
import { HandleFileExcel } from '../data/HandleFileExcel';

// Components
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface DashBoardProps {
    dataGraph: {
        month: string;
        quantity: number;
    }[],
    textGraph: string
}

export default function Dashboard({ dataGraph, textGraph }: DashBoardProps) {

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <span className="mx-auto">{textGraph}</span>
                <ResponsiveContainer className='mr-10' width='100%' height={300}>
                    <BarChart
                        data={dataGraph}
                        margin={{
                            right: 30,
                            left: 30,
                            top: 20,
                            bottom: 50, // Espaço extra para o eixo X
                        }}
                    //barCategoryGap="10%" // Define o espaçamento entre as barras
                    //barGap={20} // Define o espaçamento entre barras dentro da mesma categoria
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            angle={-30} // Rotaciona as labels
                            textAnchor="end" // Alinha o texto à direita
                            tickSize={10} // Aumenta a distância entre os ticks
                            interval={0} // Exibe todos os meses
                            tick={{ fontSize: 15 }} // Ajusta o tamanho da fonte das labels
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend
                            wrapperStyle={{
                                marginTop: 20, // Adiciona um espaço de 20px entre o gráfico e a legenda
                            }}
                        />
                        <Bar dataKey="quantity" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                <button
                    onClick={() => HandleFileExcel(dataGraph)}
                    className='p-2 border-1 ring-emerald-500 ring-2 text-emerald-500 font-black hover:ring-0 transition-all duration-500'>
                    Exportar Excel
                </button>
            </div>
        </>
    )

}
