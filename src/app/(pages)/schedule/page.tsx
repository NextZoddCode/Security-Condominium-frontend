// Imports
import { frontendURL } from './utils/url/frontendURL'

// Components
import Image from 'next/image'
import Link from 'next/link'

//Image
import Court from '../schedule/assets/images/court.jpg'
import Pool from '../schedule/assets/images/pool.jpg'


export default function Page() {
    return (

        <div className="flex flex-col justify-center items-center mt-10 gap-10">
            <h2
                style={{ textShadow: '4px 6px 5px gray' }}
                className="text-3xl font-bold text-center my-12"
            >
                Agendamentos
            </h2>

            <Link
                href={`${frontendURL}/court`}
                className='relative cursor-pointer'
            >
                <Image
                    className='h-32 w-[800px] object-cover lg:grayscale lg:hover:grayscale-0 lg:transition-all lg:duration-300'
                    src={Court}
                    alt="Court image"
                />
                <span className='absolute right-3 bottom-2 text-white text-2xl font-bold '>Quadra</span>
            </Link>

            <Link
                href={`${frontendURL}/pool`}
                className='relative cursor-pointer'>
                <Image
                    className='h-32 w-[800px] object-cover lg:grayscale lg:hover:grayscale-0 lg:transition-all lg:duration-300'
                    src={Pool}
                    alt="Pool image"
                />
                <span className='absolute right-3 bottom-2 text-white text-2xl font-bold '>Piscina</span>
            </Link>

        </div>

    )
}