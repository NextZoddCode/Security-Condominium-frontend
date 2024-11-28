// Imports


// Components
import Form from './components/Form'
import QueryClientProviderComponent from '@/components/QueryClientProvider/QueryClientProviderComponent'

export default function UpdateUser({ params }: { params: { id: string } }) {
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