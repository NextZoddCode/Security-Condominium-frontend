// Imports
import { frontendURL } from "../../features/utils/url/frontendURL"

//Components
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent"
import Link from "next/link"
import Lost from "./components/Lost"

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <div
                className="w-full my-10 flex flex-col gap-6"
            >
                <Link
                    href={`${frontendURL}`}
                    className="text-lg text-center text-violet-500 font-bold tracking-wide hover:text-violet-900 transition-all duration-400"
                >
                    Voltar
                </Link>
                <QueryClientProviderComponent>
                    <Lost id={params.id} />
                </QueryClientProviderComponent>
            </div>

        </>
    )
}