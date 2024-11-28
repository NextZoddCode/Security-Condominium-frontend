export interface UserPropsForPackage {
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
    unit?: string
}