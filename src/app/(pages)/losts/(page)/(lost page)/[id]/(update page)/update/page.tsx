// Imports
import { frontendURL } from "../../../../features/utils/url/frontendURL"

// Components
import Link from "next/link"
import Form from "./components/Form"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"


export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="flex flex-col justify-center items-center gap-6 mt-12">
            <Link
                href={`${frontendURL}`}
                className="text-lg text-center text-violet-500 font-bold tracking-wide hover:text-violet-900 transition-all duration-400"
            >
                Voltar
            </Link>
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-12"
            >
                Atualizar item perdido
            </h2>
            <QueryClientProviderComponent>
                <Form id={params.id} />
            </QueryClientProviderComponent>
        </div>
    )
}