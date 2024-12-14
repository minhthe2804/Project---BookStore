import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import classname from 'classnames/bind'

import styles from './Header.module.css'
import Popover from '../Popover'
import { navbar } from '~/constants/navbar'
import { Link, useNavigate } from 'react-router-dom'

import { path } from '~/constants/path'
import Button from '../Button'
import { useContext } from 'react'
import { AppContext } from '~/contexts/createContext'
import { clearLS } from '~/utils/auth'
import { toast } from 'react-toastify'
import { toastNotify } from '~/constants/toastNotify'

const cx = classname.bind(styles)
export default function Header() {
    const { isAuthenticated, setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        clearLS()
        setIsAuthenticated(false)
        setProfile(null)
        toast.success(toastNotify.logOut.logOutSuccess, { autoClose: 2000 })
    }

    const navigatePageCart = () => {
        navigate(path.cart)
    }

    const navigatePageAccount = () => {
        navigate(path.account)
    }
    return (
        <div className=' bg-[#f3763a]'>
            <div className='max-w-[1142px] mx-auto'>
                <div className='grid grid-cols-12 items-center'>
                    <div className='col-span-3'>
                        <Link to={path.home}>
                            <img
                                src='https://theme.hstatic.net/200000612501/1001045770/14/logo.png?v=178'
                                alt=''
                                className='w-[100px] py-3'
                            />
                        </Link>
                    </div>
                    <div className='col-span-6'>
                        <div className='flex items-center pr-[5px] pl-3 bg-white w-full border-[1px] border-[#e5e6ec]'>
                            <input
                                type='text'
                                className='w-full outline-none py-2 placeholder:text-[13px] text-black '
                                placeholder='Tìm kiếm...'
                            />
                            <div className='w-[75px] bg-[#f16325] py-[5px] text-center text-white'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 flex justify-end'>
                        <div className='flex items-end gap-3'>
                            <div className='text-center text-white w-10 py-2 border-[1px] border-[#fff] text-[16px]' onClick={navigatePageAccount}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <Popover
                                renderPopover={
                                    // <div className='w-[300px] h-[40px] shadow-sm border-[1px] border-[#e5e6ec] bg-white flex items-center pl-[20px] text-[14px] text-[#5e5d5d]'>
                                    //     Không có sản phẩm nào.
                                    // </div>
                                    <div className='w-[300px] shadow-sm border-[1px] border-[#e5e6ec] bg-white pl-[12px] pb-4'>
                                        <div
                                            className={cx('max-h-[246px] flex flex-col overflow-y-auto pr-3', {
                                                'slide-convenient-cart': true
                                            })}
                                        >
                                            <div className='flex gap-3 py-2 border-b-[1px] border-[#ededed] pb-6'>
                                                <div className='w-[60px] px-1 py-1 border-[1px] border-[#ededed]'>
                                                    <img
                                                        src='https://product.hstatic.net/200000612501/product/150_ky_hieu_ngon_ngu_giup_cha_me_va_tre_so_sinh_hieu_nhau_f13bcaf7e61a45fa941eb6b222f1b7ff_compact.jpg'
                                                        alt=''
                                                        className='w-full h-full object-cover cursor-pointer'
                                                    />
                                                </div>
                                                <div className='w-[180px] flex flex-col gap-2 text-[13px]'>
                                                    <Link
                                                        to={path.home}
                                                        className=' text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in'
                                                    >
                                                        150 Ký Hiệu Ngôn Ngữ Giúp Cha Mẹ Và Trẻ Sơ Sinh Hiểu Nhau
                                                    </Link>
                                                    <div className='flex gap-1 text-[14px]'>
                                                        <p className='text-[#f16325] font-semibold'>39,000₫</p>
                                                        <p>x</p>
                                                        <p className=''>1</p>
                                                    </div>
                                                </div>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='size-5 opacity-[0.8] hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M6 18 18 6M6 6l12 12'
                                                    />
                                                </svg>
                                            </div>

                                            <div className='flex gap-3 py-2 border-b-[1px] border-[#ededed] pb-6'>
                                                <div className='w-[60px] px-1 py-1 border-[1px] border-[#ededed]'>
                                                    <img
                                                        src='https://product.hstatic.net/200000612501/product/150_ky_hieu_ngon_ngu_giup_cha_me_va_tre_so_sinh_hieu_nhau_f13bcaf7e61a45fa941eb6b222f1b7ff_compact.jpg'
                                                        alt=''
                                                        className='w-full h-full object-cover cursor-pointer'
                                                    />
                                                </div>
                                                <div className='w-[180px] flex flex-col gap-2 text-[13px]'>
                                                    <Link
                                                        to={path.home}
                                                        className=' text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in'
                                                    >
                                                        150 Ký Hiệu Ngôn Ngữ Giúp Cha Mẹ Và Trẻ Sơ Sinh Hiểu Nhau
                                                    </Link>
                                                    <div className='flex gap-1 text-[14px]'>
                                                        <p className='text-[#f16325] font-semibold'>39,000₫</p>
                                                        <p>x</p>
                                                        <p className=''>1</p>
                                                    </div>
                                                </div>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='size-5 opacity-[0.8] hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M6 18 18 6M6 6l12 12'
                                                    />
                                                </svg>
                                            </div>

                                            <div className='flex gap-3 py-2 border-b-[1px] border-[#ededed] pb-6'>
                                                <div className='w-[60px] px-1 py-1 border-[1px] border-[#ededed]'>
                                                    <img
                                                        src='https://product.hstatic.net/200000612501/product/150_ky_hieu_ngon_ngu_giup_cha_me_va_tre_so_sinh_hieu_nhau_f13bcaf7e61a45fa941eb6b222f1b7ff_compact.jpg'
                                                        alt=''
                                                        className='w-full h-full object-cover cursor-pointer'
                                                    />
                                                </div>
                                                <div className='w-[180px] flex flex-col gap-2 text-[13px]'>
                                                    <Link
                                                        to={path.home}
                                                        className=' text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in'
                                                    >
                                                        150 Ký Hiệu Ngôn Ngữ Giúp Cha Mẹ Và Trẻ Sơ Sinh Hiểu Nhau
                                                    </Link>
                                                    <div className='flex gap-1 text-[14px]'>
                                                        <p className='text-[#f16325] font-semibold'>39,000₫</p>
                                                        <p>x</p>
                                                        <p className=''>1</p>
                                                    </div>
                                                </div>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='currentColor'
                                                    className='size-5 opacity-[0.8] hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M6 18 18 6M6 6l12 12'
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className='mt-5 pr-3'>
                                            <div className='flex items-center  justify-between text-[14px]'>
                                                <p className='text-[#555555]'>Tổng tiền:</p>
                                                <p className='font-semibold text-[#f16325]'>39,000₫</p>
                                            </div>
                                            <Button className='w-full bg-[#f16235] text-[14px] text-white flex items-center justify-center py-2 hover:opacity-[0.9] transtion duration-200 ease-in mt-4'>
                                                Thanh toán
                                            </Button>
                                        </div>
                                    </div>
                                }
                                placement='bottom-end'
                                as='div'
                                blogTop={78}
                                blogRight={112}
                                transformOrigin='190'
                            >
                                <div
                                    className={cx('flex items-center cursor-pointer relative', {
                                        'blog-cart': true
                                    })}
                                    onClick={navigatePageCart}
                                >
                                    <div className='text-center text-white w-10 py-2 border-[1px] border-[#fff] text-[16px] z-[2]'>
                                        <FontAwesomeIcon icon={faBagShopping} />
                                    </div>
                                    <div className='text-center text-white w-[91px] py-[10px] border-b-[1px] border-t-[1px] border-r-[1px] border-[#fff] text-[13px] z-[2]'>
                                        Giỏ hàng 0
                                    </div>
                                </div>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#f16325]'>
                <nav className='max-w-[1142px] mx-auto py-[16px] flex items-center'>
                    <ul className='flex gap-[76px] ml-[280px]'>
                        {navbar.map((nav, index) => (
                            <li key={index} className='text-white font-semibold text-[14px] cursor-pointer group'>
                                <Link
                                    to={nav.path}
                                    className='group-hover:text-[#b80319] transtion duration-200 ease-in'
                                >
                                    {nav.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='ml-auto'>
                        {!isAuthenticated && (
                            <div className='flex items-center gap-2 text-white'>
                                <Link to={path.register} className='flex items-center gap-1 text-white text-[14px]'>
                                    <FontAwesomeIcon icon={faUser} className='text-[14px]' />
                                    <p className='text-[14px]'>Đăng Ký</p>
                                </Link>
                                <p>/</p>
                                <Link to={path.login} className='flex items-center gap-1 text-white text-[14px]'>
                                    <p>Đăng Nhập</p>
                                </Link>
                            </div>
                        )}

                        {isAuthenticated && (
                            <div className='flex items-center gap-2 text-white'>
                                <Link to={path.home} className='flex items-center gap-1 text-white text-[14px]'>
                                    <FontAwesomeIcon icon={faUser} className='text-[14px]' />
                                    <p className='text-[14px]'>Tài khoản</p>
                                </Link>
                                <p>/</p>
                                <p
                                    className='flex items-center gap-1 text-white text-[14px] cursor-pointer'
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </p>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}
