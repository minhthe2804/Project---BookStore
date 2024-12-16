import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Button from '~/components/Button'
import { path } from '~/constants/path'
import { useContext } from 'react'
import { AppContext } from '~/contexts/createContext'
import { useMutation, useQuery } from '@tanstack/react-query'
import { checkoutApi } from '~/apis/checkout.api'

export default function ThankYou() {
    const { productInThankyou, setProductInThankyou, setIsThankyou, setIsAddress, setIsCheckout, setIsPageCart } =
        useContext(AppContext)

    const navigate = useNavigate()

    const { data: productInCheckoutData, refetch } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const productCheckout = productInCheckoutData?.data

    const deleteProductToCheckoutMutation = useMutation({
        mutationFn: (id: string) => checkoutApi.deleteCheckout(id),
        onSuccess: () => {
            refetch()
        }
    })

    const handleContinueShopping = () => {
        if (productCheckout) {
            productCheckout.map((checkout) => deleteProductToCheckoutMutation.mutate(checkout.id))
            setIsAddress(false)
            setIsCheckout(false)
            localStorage.removeItem('checkout')
            setIsThankyou(false)
            setProductInThankyou([])
            setIsPageCart(false)
            navigate(path.home)
        }
    }

    return (
        <div>
            {/* <Helmet>
                <title>Đặt hàng thành công – Hệ Thống Xe máy Hoàng Cầu</title>
                <meta name='description' content='Hệ Thống Xe máy Hoàng Cầu' />
            </Helmet> */}
            <div className='mt-[3px] text-[14px] relative'>
                <p className='text-[20px]'>Đặt hàng thành công</p>
                <p className='text-[#737373] mt-[-4px]'>{`Mã đơn hàng #${productInThankyou[0].order}`}</p>
                <p className='text-[#4d4d4d] mt-[-4px]'>Cảm ơn bạn đã mua hàng!</p>

                <div className='absolute w-[50px] h-[50px] rounded-full border-[2px] border-[#338dbc] top-[10px] left-[-70px] flex items-center justify-center'>
                    <FontAwesomeIcon icon={faCheck} className='text-[#338dbc] text-[24px]' />
                </div>
            </div>

            <div className='w-full border-[1px] border-[#e6e6e6] rounded-[4px_4px_0_0] pl-[10px] mt-[13px] pt-[8px] pb-[9px] text-[14px] text-[#4d4d4d]'>
                <p className='text-[18px] text-[#333333]'>Thông tin đơn hàng</p>
                <p className='mt-[3px]'>Thông tin vận chuyển</p>
                <p>{`Họ Tên: ${productInThankyou[0].username}`}</p>
                <p>{`Số điện thoại: ${productInThankyou[0].phone}`}</p>
                <p>{`Địa chỉ: ${productInThankyou[0].address}`}</p>
                <p className='text-[#333333] mt-[20px]'>Phương thức thanh toán</p>
                <p className='text-[#737373] mt-[8px]'>Thanh toán trực tiếp tại cửa hàng</p>
            </div>

            <div className='flex items-center justify-between mt-[7px]'>
                <div className='flex items-center'>
                    <div className='w-[16px] h-[16px] bg-[#b5b5b5] rounded-full text-white text-[12px] flex items-center justify-center'>
                        ?
                    </div>
                    <p className='text-[14px] text-[#737373] ml-[7px]'>Cần hỗ trợ?</p>
                    <Link
                        to={path.contact}
                        className='text-[#2b78a0] hover:text-[#48b9f7] transtion duration-200 ease-in text-[14px] ml-[4px]'
                    >
                        Liên hệ
                    </Link>
                </div>
                <Button
                    className={classNames(
                        'w-[166px] py-[17px] bg-[#2b78a0] rounded-[4px] text-[14px] font-[600] text-white hover:bg-[#42ade7] transition duration-200 ease-in flex items-center justify-center mt-[13px]'
                        // {
                        //     'w-[203px] py-[17px] bg-[#2b78a0] opacity-[0.6] rounded-[4px] text-[14px] font-[600] text-white flex items-center justify-center':
                        //         true
                        // }
                    )}
                    onClick={handleContinueShopping}
                    // isLoading={true}
                    // disabled={true}
                >
                    Tiếp tục mua hàng
                </Button>
            </div>

            <div className='w-full h-[1px] bg-[#e6e6e6] mt-[70px]'></div>
            <p className='text-center text-[13px] text-[#333333] mt-[11px]'>Powered by Haravan</p>
        </div>
    )
}
