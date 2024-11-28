//Imports
import React, { ComponentProps } from "react";

interface ButtonPaginationProps extends ComponentProps<'button'> {
    children: React.ReactNode,
    pageSelected: boolean
}


export default function ButtonPagination({ children, pageSelected, ...rest }: ButtonPaginationProps) {
    return (
        <button
            {...rest}
            className={`${pageSelected ?
                'py-1 px-2 bg-violet-500 color-white rounded-sm self-end'
                : 'py-1 px-2 color-white rounded-sm self-end'}`}
        >
            <strong>{children}</strong>
        </button>
    )
}