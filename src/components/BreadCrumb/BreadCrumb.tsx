import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

interface Props {
    title?: string
}

export default function BreadCrumb({ title }: Props) {
    return (
        <div className='bg-[#f7f8f9] border-b-[1px] border-[#ebebeb]'>
            <div className='max-w-[1142px] mx-auto h-[36px] '>
                <div className='flex items-center gap-[10px] h-full'>
                    <Link
                        to={path.home}
                        className='text-[14px] text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in'
                    >
                        Trang chủ
                    </Link>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-3'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                    </svg>
                    <p className='text-[14px] text-[#f16325]'>{title}</p>
                </div>
            </div>
        </div>
    )
}
