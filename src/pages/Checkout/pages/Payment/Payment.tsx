import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { checkoutApi } from '~/apis/checkout.api'
import { purcharseApi } from '~/apis/purcharse.api'
import Button from '~/components/Button'
import { path } from '~/constants/path'
import { toastNotify } from '~/constants/toastNotify'
import { AppContext } from '~/contexts/createContext'
import { PurcharseType } from '~/types/purcharse.type'
import { generateCartId, generateOrderId, getDateString, getTimeString } from '~/utils/utils'

export default function Payment() {
    const { profile, setIsThankyou, setProductInThankyou } = useContext(AppContext)

    const navigate = useNavigate()
    const { data: checkoutProductData } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const checkoutProduct = checkoutProductData?.data
    const buyProductMutation = useMutation({
        mutationFn: (body: PurcharseType) => purcharseApi.buyProducts(body)
    })

    const handlePayment = async () => {
        if (checkoutProduct && profile) {
            try {
                const date = getDateString()
                const time = getTimeString()

                const res = await Promise.all(
                    checkoutProduct.map((checkout) =>
                        buyProductMutation.mutateAsync({
                            ...checkout,
                            id: generateCartId(),
                            username: profile.username,
                            address: profile.address as string,
                            phone: profile.phone as string,
                            date,
                            time,
                            order: generateOrderId()
                        })
                    )
                )
                setProductInThankyou((prev) => [...prev, ...res.map((response) => response.data)])
                setIsThankyou(true)
                toast.success(toastNotify.purcharse.buyProduct, { autoClose: 2000 })
                navigate(path.checkoutThankYou)
            } catch (error) {
                console.error('Lỗi khi mua sản phẩm:', error)
                toast.error('Đã xảy ra lỗi khi mua sản phẩm', { autoClose: 2000 })
            }
        }
    }

    return (
        <div className=''>
            {/* <Helmet>
                <title>Phương thức thanh toán – Hệ Thống Xe máy Hoàng Cầu</title>
                <meta name='description' content='Hệ Thống Xe máy Hoàng Cầu' />
            </Helmet> */}
            <p className='text-[18px] mt-[8px] text-[#333333]'>Phương thức vận chuyển</p>
            <div className='w-full border-[1px] border-[#e6e6e6] rounded-[4px] py-[17px] px-[20px] flex items-center justify-between mt-[16px]'>
                <div className='flex items-center gap-[13px]'>
                    <div className='w-[18px] h-[18px] rounded-full bg-[#338bdc] flex justify-center items-center'>
                        <div className='w-[4px] h-[4px] rounded-full bg-white'></div>
                    </div>
                    <p className='text-[14px] text-[#737373]'>Nhận hàng trực tiếp tại cửa hàng</p>
                </div>
                <p className='text-[14px] text-[#737373]'>0₫</p>
            </div>
            <p className='text-[18px] mt-[20px] text-[#333333]'>Phương thức thanh toán</p>
            <div className='w-full border-[1px] border-[#e6e6e6] rounded-[4px_4px_0_0] py-[18px] px-[20px] flex items-center justify-between mt-[16px]'>
                <div className='flex items-center gap-[13px]'>
                    <div className='w-[18px] h-[18px] rounded-full bg-[#338bdc] flex justify-center items-center'>
                        <div className='w-[4px] h-[4px] rounded-full bg-white'></div>
                    </div>
                    <div className='w-[40px] h-[40px]'>
                        <img
                            src='https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6'
                            alt=''
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <p className='text-[14px] text-[#737373]'>Thanh toán trực tiếp tại cửa hàng</p>
                </div>
            </div>
            <div className='w-full border-l-[1px] border-r-[1px] border-b-[1px] border-[#e6e6e6] rounded-[0_0_4px_4px] py-[26px] px-[20px] flex items-center justify-center text-center bg-[#fafafa]'>
                <p className='text-[14px] text-[#737373]'>
                    Quý khách hàng vui lòng chờ cuộc gọi xác nhận đơn hàng và hỗ trợ thanh toán từ nhân viên cửa hàng.
                    Xin chân thành cảm ơn
                </p>
            </div>
            <div className='flex items-center justify-between mt-[7px]'>
                <Link
                    to={path.cart}
                    className='text-[#2b78a0] hover:text-[#48b9f7] transtion duration-200 ease-in text-[14px]'
                >
                    Giỏ hàng
                </Link>
                <Button
                    className={classNames(
                        'w-[107px] py-[17px] bg-[#2b78a0] rounded-[4px] text-[14px] font-[600] text-white hover:bg-[#42ade7] transition duration-200 ease-in flex items-center justify-center mt-[13px]'
                        // {
                        //     'w-[203px] py-[17px] bg-[#2b78a0] opacity-[0.6] rounded-[4px] text-[14px] font-[600] text-white flex items-center justify-center':
                        //         true
                        // }
                    )}
                    onClick={handlePayment}
                    // isLoading={true}
                    // disabled={true}
                >
                    Đặt hàng
                </Button>
            </div>
            <div className='w-full h-[1px] bg-[#e6e6e6] mt-[30px]'></div>
            <p className='text-center text-[13px] text-[#333333] mt-[11px]'>Powered by Haravan</p>
        </div>
    )
}
