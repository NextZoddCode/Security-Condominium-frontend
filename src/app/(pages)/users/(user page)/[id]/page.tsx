// Imports
import { Suspense } from 'react';
import { UserPageProps } from './utils/types/user-page';
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"


// Components
import User from './components/User'
import Loading from '@/components/Loading/Loading';
import QueryClientProviderComponent from '@/components/QueryClientProvider/QueryClientProviderComponent';

export default async function UserPage({ params }: UserPageProps) {

    const session = await getServerSession()

    if (!session) {
        // Redireciona para a página de login do NextAuth
        redirect('/api/auth/signin')
    }

    return (
        <Suspense fallback={<Loading />}>
            <QueryClientProviderComponent>
                <User params={params} />
            </QueryClientProviderComponent>
        </Suspense>
    );
}