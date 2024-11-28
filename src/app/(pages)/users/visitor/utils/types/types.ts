// Imports
import { UserSchema } from "../../../features/utils/types/UserSchema";

export interface RegisterVisitorProps {
    name: string,
    document: string,
    description: string,
    plate?: string,
    model?: string,
    authorized: string,
    user: UserSchema
}

export interface UserSchemaForVisitor {
    user: {
        id: string,
        name: string,
        owner: boolean,
        image: string,
        email: string,
        document: string,
        tel: string,
        date: string,
        units: { unity: string }[],
    },
    unity: string
}