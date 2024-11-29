// Imports
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

// Components
import Form from './components/Form'
import QueryClientProviderComponent from '@/components/QueryClientProvider/QueryClientProviderComponent'

export default async function UpdateUser({ params }: { params: { id: string } }) {

    const session = await getServerSession()

    if (!session) {
        // Redireciona para a página de login do NextAuth
        redirect('/api/auth/signin')
    }

    return (
        <section className="px-4 mt-10 flex flex-col justify-center items-center">
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold"
            >
                Atualizar usuário
            </h2>
            <QueryClientProviderComponent>
                <Form userId={params.id} />
            </QueryClientProviderComponent>
        </section>
    )
}