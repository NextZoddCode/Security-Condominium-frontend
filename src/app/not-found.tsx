import PageNotFound from '../assets/404.png'
import Image from 'next/image'

export default async function NotFound() {

    return (
        <div className='flex justify-center items-center mt-20'>
            <Image
                src={PageNotFound}
                alt="Not Found Image"
                width={500}
                height={500}
                quality={100}
            />
        </div>
    )
}