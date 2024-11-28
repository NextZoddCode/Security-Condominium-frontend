// Imports 


// Components
import Form from "./components/Form"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default function Page() {
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