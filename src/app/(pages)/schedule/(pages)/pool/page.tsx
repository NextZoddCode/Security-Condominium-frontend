// Imports
import { frontendURL } from "../../utils/url/frontendURL";

// Components
import Link from "next/link";
import Form from "./components/Form";
import QueryClientProviderComponent from "@/components/QueryClientProvider/QueryClientProviderComponent";

export default function Page() {
    return (
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
                <Form />
            </QueryClientProviderComponent>
        </div>
    )
}