// Imports


// Components
import Package from "./components/Packages"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default function Page() {
    return (
        <>
            <QueryClientProviderComponent>
                <Package />
            </QueryClientProviderComponent>

        </>
    )
}