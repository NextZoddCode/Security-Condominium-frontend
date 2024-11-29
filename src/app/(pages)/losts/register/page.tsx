// Imports 
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

// Components
import Form from "./components/Form"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default async function Page() {

    const session = await getServerSession()

    if (!session) {
        // Redireciona para a página de login do NextAuth
        redirect('/api/auth/signin')
    }

    return (
        <>
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-20"
            >
                Cadastrar item perdido
            </h2>
            <QueryClientProviderComponent>
                <Form />
            </QueryClientProviderComponent>
        </>
    )
}