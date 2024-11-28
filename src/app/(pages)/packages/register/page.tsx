// Imports


// Components
import Form from "./components/Form";
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent";

export default function Page() {
    return (
        <section className="px-4 mt-10 flex flex-col justify-center items-center">
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold"
            >
                Registro de Encomenda
            </h2>
            <QueryClientProviderComponent>
                <Form />
            </QueryClientProviderComponent>
        </section>
    );
}