'use client'
import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export default function Home() {

    const { replace } = useRouter()

    useEffect(() => {
        replace('http://localhost:3000/users/search')
    }, [])

    return <div className='flex justify-center items-center mt-20'><Loading /></div>;
}
