import { faCode, faHome, faPhone, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link, Outlet, useMatch } from 'react-router-dom'
import classNames from 'classnames'

import { purcharseApi } from '~/apis/purcharse.api'
import BreadCrumb from '~/components/BreadCrumb'
import Help from '~/components/Help'
import Policy from '~/components/Policy'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/createContext'
import { formatCurrency, generateId } from '~/utils/utils'

export default function Account() {
    const accountMatch = useMatch(path.account)
    const isAccount = Boolean(accountMatch)
    const { profile } = useContext(AppContext)

    const { data: productInPurcharseData } = useQuery({
        queryKey: ['purcharse'],
        queryFn: () => purcharseApi.getPurcharse()
    })

    const productPurcharse = productInPurcharseData?.data
    return (
        <div>
            {isAccount && (
                <>
                    <BreadCrumb title={breadCrumb.login.title} />
                    <div className='max-w-[1142px] mx-auto'>
                        <div className='grid grid-cols-12 gap-[33px]'>
                            <div className='col-span-9'>
                                <h1 className='uppercase text-[14px] text-[#555555] font-semibold mt-5'>
                                    Thông tin tài khoản
                                </h1>
                                <div className='flex items-center text-[14px] text-[#555555] font-semibold gap-1'>
                                    <p className=''>Xin chào,</p>
                                    <Link to={path.account} className='text-[#f16325] hover:underline'>
                                        {profile?.username}
                                    </Link>
                                    <p className=''> !</p>
                                </div>

                                {productPurcharse && productPurcharse.length > 0 ? (
                                    <div className='w-full mt-[33px]'>
                                        <table className='min-w-full'>
                                            <thead>
                                                <tr className='bg-[#eceeef] text-[#55595c] text-[13.5px] border border-[#dddddd]'>
                                                    <th className='py-1 w-[115px] px-2'>Đơn hàng</th>
                                                    <th className='py-1 w-[124px] px-2'>Ngày</th>
                                                    <th className='py-1 w-[174px] px-2'>Giá trị đơn hàng</th>
                                                    <th className='py-1 w-[224px] px-2'>Trạng thái thanh toán</th>
                                                    <th className='py-1 w-[217px] px-2'>Trạng thái giao hàng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productPurcharse &&
                                                    productPurcharse.map((purcharse) => (
                                                        <tr
                                                            className='text-[#1c1c1c] text-[13px] border border-[#ebebeb] text-center'
                                                            key={purcharse.id}
                                                        >
                                                            <td className='py-2 w-[115px] px-2 border-r-[1px] border-[#ebebeb] text-[#337ab7] hover:text-[#f16325] hover:underline'>
                                                                <Link
                                                                    to={path.accountOder.replace(
                                                                        ':nameId',
                                                                        generateId(purcharse.id)
                                                                    )}
                                                                >{`#${purcharse.order}`}</Link>
                                                            </td>
                                                            <td className='py-2 w-[124px] px-2 border-r-[1px] border-[#ebebeb]'>
                                                                {`${purcharse.date}`}
                                                            </td>
                                                            <td className='py-2 w-[174px] px-2 border-r-[1px] border-[#ebebeb] text-[#555555] '>
                                                                {formatCurrency(purcharse.totalProduct)}
                                                            </td>
                                                            <td className='py-2 w-[224px] px-2 border-r-[1px] border-[#ebebeb] italic'>
                                                                Thanh toán một phần
                                                            </td>
                                                            <td className='py-2 w-[217px] px-2 italic'>
                                                                Chưa giao hàng
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <>
                                        <div className='w-full mt-[33px]'>
                                            <table className='min-w-full'>
                                                <thead>
                                                    <tr className='bg-[#eceeef] text-[#55595c] text-[13.5px] border border-[#dddddd]'>
                                                        <th className='py-1 w-[115px] px-2'>Đơn hàng</th>
                                                        <th className='py-1 w-[124px] px-2'>Ngày</th>
                                                        <th className='py-1 w-[174px] px-2'>Giá trị đơn hàng</th>
                                                        <th className='py-1 w-[224px] px-2'>Trạng thái thanh toán</th>
                                                        <th className='py-1 w-[217px] px-2'>Trạng thái giao hàng</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className='border-l border-r border-b border-[#dddddd] w-full py-3 text-[13px] text-[#1c1c1c] flex justify-center items-center'>
                                                <p>Không có đơn hàng nào</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className='col-span-3'>
                                <div className='mt-[27px] border border-[#ebebeb] rounded-[4px] px-[17px] pt-4 pb-[32px]'>
                                    <p className='text-[18px] text-[#323c3f] uppercase'>Tài khoản của tôi</p>
                                    <p className='text-[14px] text-[#555555] mt-5'>
                                        Tên tài khoản:
                                        <span className='ml-1 font-semibold'>{profile?.username}!</span>
                                    </p>
                                    <div className='flex flex-col mt-2 gap-y-[7px]'>
                                        <div className='flex items-center gap-[14px]'>
                                            <div className='w-3'>
                                                <FontAwesomeIcon icon={faHome} className='text-[12px] text-[#f16325]' />
                                            </div>
                                            <p className='text-[#555555] text-[14px] mt-1'>
                                                Địa chỉ: {profile?.address}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-[14px]'>
                                            <div className='w-3'>
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    className='text-[12px] text-[#f16325]'
                                                />
                                            </div>
                                            <p className='text-[#555555] text-[14px] mt-1'>
                                                Điện thoại: {profile?.phone}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-[14px]'>
                                            <div className='w-3'>
                                                <FontAwesomeIcon
                                                    icon={faPlane}
                                                    className='text-[12px] text-[#f16325]'
                                                />
                                            </div>
                                            <p className='text-[#555555] text-[14px] mt-1'>Quốc gia :Vietnam</p>
                                        </div>
                                        <div className='flex items-center gap-[14px]'>
                                            <div className='w-3'>
                                                <FontAwesomeIcon icon={faCode} className='text-[12px] text-[#f16325]' />
                                            </div>
                                            <p className='text-[#555555] text-[14px] mt-1'>Zip code: 70000</p>
                                        </div>
                                    </div>
                                    <Link
                                        to={path.updateProfile}
                                        className={classNames(
                                            'w-full py-2 bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center mt-[13px]'
                                        )}
                                    >
                                        Cập nhật thông tin
                                    </Link>
                                    <Link
                                        to={path.changePassword}
                                        className={classNames(
                                            'w-full py-2 bg-[#337ab7] text-[14px] text-white hover:bg-[#286090] transition duration-200 ease-in flex items-center justify-center mt-[13px]'
                                        )}
                                    >
                                        Đổi mật khẩu
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Outlet />
            <div className='mt-[42px]'>
                <Help />
                <Policy />
            </div>
        </div>
    )
}
