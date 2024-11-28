// Imports
import { ComponentProps } from "react"

interface ImageProps extends ComponentProps<'img'> { }

export default function UserImage({
    ...rest
}: ImageProps) {
    return (
        <>
            <img
                className="h-96 w-96"
                {...rest}
            />
        </>
    )
}