// Imports
import { Suspense } from 'react';
import { UserPageProps } from './utils/types/user-page';

// Components
import User from './components/User'
import Loading from '@/components/Loading/Loading';
import QueryClientProviderComponent from '@/components/QueryClientProvider/QueryClientProviderComponent';

export default function UserPage({ params }: UserPageProps) {
    return (
        <Suspense fallback={<Loading />}>
            <QueryClientProviderComponent>
                <User params={params} />
            </QueryClientProviderComponent>
        </Suspense>
    );
}