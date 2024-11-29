// Imports
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


// Components
import Losts from "./components/Losts"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default async function Page() {

    const session = await getServerSession()

    if (!session) {
        // Redireciona para a página de login do NextAuth
        redirect('/api/auth/signin')
    }

    return (
        <>
            <QueryClientProviderComponent>
                <Losts />
            </QueryClientProviderComponent>
        </>
    )
}