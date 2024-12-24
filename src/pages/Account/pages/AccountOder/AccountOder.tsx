import { faArrowLeft, faMapMarker, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import { purcharseApi } from '~/apis/purcharse.api'
import BreadCrumb from '~/components/BreadCrumb'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import { formatCurrency, generateId, getIdFromNameId } from '~/utils/utils'

export default function AccountOder() {
    const { nameId } = useParams() // lấy param để tiến hành gọi api sản phẩm
    const id = getIdFromNameId(nameId as string) // thực hiện loại bỏ những thành phần không cần thiết chỉ lấy mỗi id

    const { data: productToPurcharse } = useQuery({
        queryKey: ['purcharse', id],
        queryFn: () => purcharseApi.getProductToPurcharse(id)
    })

    const productPurcharse = productToPurcharse?.data
    return (
        <div>
            <BreadCrumb title={breadCrumb.login.title} titleProduct='Đơn hàng' />

            <div className='max-w-[1142px] mx-auto'>
                <h1 className='text-[18px] text-[#323c3f] uppercase mt-4'>{`Đơn hàng #${productPurcharse?.order}`}</h1>

                <div className='flex items-center gap-9 cursor-pointer group'>
                    <p className='text-[14px] text-[#555555] italic'>{`Ngày tạo — ${productPurcharse?.date}`} </p>
                    <div className='flex items-center gap-1 text-[14px] text-[#f16325]'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <Link to={path.account} className='group-hover:underline'>Quay lại trang tài khoản</Link>
                    </div>
                </div>

                <div className='grid grid-cols-12 mt-5'>
                    <div className='col-span-6'>
                        <p className='text-[18px] text-[#555555]'>Địa chỉ thanh toán</p>
                        <p className='text-[14px] text-[#555555]'>
                            Trạng thái thanh toán:
                            <span className='ml-1 italic'>Thanh toán một phần</span>
                        </p>
                        <div className='flex flex-col gap-4 mt-[18px]'>
                            <div className='flex items-center gap-[10px] text-[14px] '>
                                <FontAwesomeIcon icon={faUser} className='text-[#f16325] w-3' />
                                <p className='text-[#555555] mt-1'>{productPurcharse?.username}</p>
                            </div>
                            <div className='flex items-center gap-[10px] text-[14px] '>
                                <FontAwesomeIcon icon={faMapMarker} className='text-[#f16325] w-3' />
                                <p className='text-[#555555] mt-1'>{productPurcharse?.address}</p>
                            </div>
                            <div className='flex items-center gap-[10px] text-[14px] '>
                                <FontAwesomeIcon icon={faPhone} className='text-[#f16325] w-3' />
                                <p className='text-[#555555] mt-1'>{productPurcharse?.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-6'>
                        <p className='text-[18px] text-[#555555]'>Địa chỉ giao hàng</p>
                        <p className='text-[14px] text-[#555555]'>
                            Trạng thái hoàn thành:
                            <span className='ml-1 italic'>Chưa giao hàng</span>
                        </p>
                        <div className='flex flex-col gap-4 mt-[18px]'>
                            <div className='flex items-center gap-[10px] text-[14px] '>
                                <FontAwesomeIcon icon={faUser} className='text-[#f16325] w-3' />
                                <p className='text-[#555555] mt-1'>{productPurcharse?.username}</p>
                            </div>
                            <div className='flex items-center gap-[10px] text-[14px] '>
                                <FontAwesomeIcon icon={faMapMarker} className='text-[#f16325] w-3' />
                                <p className='text-[#555555] mt-1'>{productPurcharse?.address}</p>
                            </div>
                            <div className='flex items-center gap-[10px] text-[14px] '>
                                <FontAwesomeIcon icon={faPhone} className='text-[#f16325] w-3' />
                                <p className='text-[#555555] mt-1'>{productPurcharse?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-[33px]'>
                    <table className='min-w-full'>
                        <thead>
                            <tr className='text-[#1c1c1c] text-[13.5px] border-l border-r border-b border-[#dddddd]'>
                                <th className='py-1 w-[811px] px-2 text-left border-r border-[#dddddd]'>Sản phẩm</th>
                                <th className='py-1 w-[122px] px-2 border-r border-[#dddddd]'>Giá</th>
                                <th className='py-1 w-[85px] px-2 border-r border-[#dddddd]'>Số lượng</th>
                                <th className='py-1 w-[122px] px-2'>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productPurcharse &&
                                productPurcharse.product.map((purcharse) => (
                                    <tr className='text-[#1c1c1c] text-[13px]' key={purcharse.id}>
                                        <td className='py-2 w-[811px] px-2 border-l border-b border-[#ebebeb] text-[#337ab7] hover:text-[#f16325] hover:underline truncate block cursor-pointer'>
                                            <Link
                                                to={path.accountOder.replace(
                                                    ':nameId',
                                                    generateId(productPurcharse.id)
                                                )}
                                            >
                                                {purcharse.title}
                                            </Link>
                                        </td>
                                        <td className='py-2 w-[122px] px-2 border-l border-r border-b border-[#ebebeb]'>
                                            {formatCurrency(purcharse.price)}
                                        </td>
                                        <td className='py-2 w-[85px] px-2 border-l border-r border-b border-[#ebebeb]'>
                                            {purcharse.count}
                                        </td>
                                        <td className='py-2 w-[122px] px-2 border-l border-r border-b border-[#ebebeb]'>
                                            {formatCurrency(purcharse.totalPrice)}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className='flex items-center mt-5'>
                    <div className='w-[430px] border border-[#ebebeb] py-2 px-2 flex items-center text-left text-[#1c1c1c]'>
                        <p className='text-[14px]'>Phí vận chuyển:</p>
                    </div>
                    <div className='w-[711px] border-r border-b border-t border-[#ebebeb] py-2 px-2 flex items-center justify-end text-[#1c1c1c]'>
                        <p className='text-[14px]'>
                            Giao hàng tận nơi -
                            <span className='ml-1 text-[#f16325] font-semibold'>{formatCurrency(35000)}</span>
                        </p>
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='w-[430px] border-r border-b border-l border-[#ebebeb] py-2 px-2 flex items-center text-left text-[#1c1c1c]'>
                        <p className='text-[14px]'>Tổng tiền:</p>
                    </div>
                    <div className='w-[711px] border-r border-b  border-[#ebebeb] py-2 px-2 flex items-center justify-end text-[#1c1c1c]'>
                        <p className='text-[14px] text-[#f16325] font-semibold'>
                            {formatCurrency(productPurcharse?.totalProduct as number)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
