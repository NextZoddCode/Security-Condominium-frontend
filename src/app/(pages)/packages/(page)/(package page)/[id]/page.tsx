// Imports


// Components
import Package from "./components/Package"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <QueryClientProviderComponent>
                <Package id={params.id} />
            </QueryClientProviderComponent>
        </>

    )
}