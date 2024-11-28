// Imports


// Components
import Losts from "./components/Losts"
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"

export default function Page() {
    return (
        <>
            <QueryClientProviderComponent>
                <Losts />
            </QueryClientProviderComponent>
        </>
    )
}