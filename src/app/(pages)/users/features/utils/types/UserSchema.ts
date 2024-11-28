export interface UserSchema {
    id: string,
    name: string,
    owner: boolean,
    image: string,
    email: string,
    document: string,
    tel: string,
    date: string,
    units: { unity: string }[],
    createdAt?: string
}

export interface UserSchemaArray {
    usersData: UserSchema[]
}