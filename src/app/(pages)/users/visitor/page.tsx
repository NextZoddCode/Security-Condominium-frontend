// Imports
import Form from "./components/Form"

// Components
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default function Visitor() {
    return (
        <section className="px-4 mt-10 flex flex-col justify-center items-center">
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold"
            >
                Registrar Visitante
            </h2>
            <QueryClientProviderComponent>
                <Form />
            </QueryClientProviderComponent>
        </section>
    )
}