export interface PackageProps {
    id: string
    recipient: string,
    description: string,
    packageCode: string,
    transporter?: null,
    status: string,
    deliveredTo?: string,
    createdAt: string,
    updateAt: string,
    userUnity: string,
    userId: string
}
