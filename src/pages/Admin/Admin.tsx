import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { adminAside } from '~/constants/asideAdmin'
import HeaderAdmin from './components/HeaderAdmin'
import { Link, Outlet } from 'react-router-dom'

export default function Admin() {
    return (
        <div>
            <div className='grid grid-cols-12'>
                <div className='col-span-2 bg-[#f16325]'>
                    <div className='w-full flex flex-col items-center mt-6'>
                        <div className='w-[80px] h-[80px] mt-4 rounded-full border-[2px] border-[#fff] flex justify-center items-center'>
                            <FontAwesomeIcon icon={faUserTie} className='text-white text-[40px]' />
                        </div>
                        <h1 className='mt-1 text-[20px] text-white font-semibold '>Admin</h1>
                        <p className='text-[18px] text-white'>Chào mừng bạn trở lại</p>
                    </div>
                    <div className='mt-2 w-[210px] mx-auto'>
                        <div className='w-full h-[1px] bg-white'></div>
                    </div>
                    <div className='mt-3 w-[190px] mx-auto'>
                        {adminAside.map((aside, index) => (
                            <div
                                className='flex items-center py-2 gap-4 text-white text-[14px] font-semibold rounded-[4px] cursor-pointer hover:bg-gray-400 transition duration-200 ease-in'
                                key={index}
                            >
                                <div className='ml-3'>
                                    <FontAwesomeIcon icon={aside.icon} />
                                </div>
                                <Link to={aside.link} className=''>
                                    {aside.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-span-10 bg-slate-100'>
                    <HeaderAdmin />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
