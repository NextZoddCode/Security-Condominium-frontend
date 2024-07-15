import { ComponentProps, ElementType } from "react";

interface MenuIconProps extends ComponentProps<"button"> {
    icon: ElementType;
}

export default function MenuIcon({ icon: Icon, ...rest }: MenuIconProps) {
    return (
        <>
            <Icon size="20" {...rest} />
        </>
    );
}
