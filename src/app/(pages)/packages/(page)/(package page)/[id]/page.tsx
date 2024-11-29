// Imports
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

// Components
import Package from "./components/Package"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default async function Page({ params }: { params: { id: string } }) {

    const session = await getServerSession()

    if (!session) {
        // Redireciona para a página de login do NextAuth
        redirect('/api/auth/signin')
    }

    return (
        <>
            <QueryClientProviderComponent>
                <Package id={params.id} />
            </QueryClientProviderComponent>
        </>

    )
}