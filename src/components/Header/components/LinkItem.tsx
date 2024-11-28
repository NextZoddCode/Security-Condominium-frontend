'use client'
//Imports
import Link from "next/link";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";

interface LinkItemProps extends ComponentProps<"a"> {
    children: React.ReactNode;
    href: string;
}

export default function LinkItem({ children, href }: LinkItemProps) {

    const pathname = usePathname()

    const activeLink = href === pathname

    return (
        <>
            <Link
                className={`${activeLink ? 'bg-zinc-300' : ''} w-full text-center text-md font-bold text-violet-500 py-2 bg-zinc-200/50 hover:bg-zinc-400/50 transition-all duration-300`}
                href={href}
            >
                {children}
            </Link>
        </>
    );
}
