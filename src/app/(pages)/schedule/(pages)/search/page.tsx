// Imports


// Components
import Form from "./components/Form";
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent";

export default function Page() {
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-8 my-10">

                <h2
                    style={{ textShadow: '4px 6px 5px gray' }}
                    className="text-3xl font-bold text-center my-12"
                >
                    Buscar por:
                </h2>
                <QueryClientProviderComponent>
                    <Form />
                </QueryClientProviderComponent>
            </div>
        </>
    )
}