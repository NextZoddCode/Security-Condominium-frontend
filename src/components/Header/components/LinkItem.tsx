//Imports
import Link from "next/link";
import { ComponentProps } from "react";

interface LinkItemProps extends ComponentProps<"a"> {
    children: React.ReactNode;
    href: string;
}

export default function LinkItem({ children, href }: LinkItemProps) {
    return (
        <>
            <Link
                className="w-full text-center text-md font-bold text-violet-500 py-2 bg-zinc-200/50 hover:bg-zinc-400/50 transition-all duration-300"
                href={href}
            >
                {children}
            </Link>
        </>
    );
}
