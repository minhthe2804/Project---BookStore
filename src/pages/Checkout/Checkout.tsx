import { Link, Outlet, useMatch } from 'react-router-dom'
import classNames from 'classnames'

import { useContext, useEffect, useMemo } from 'react'
import { formatCurrency, formatCurrencySum } from '~/utils/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import { checkoutApi } from '~/apis/checkout.api'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/createContext'

export default function Checkout() {
    const { setIsCheckout } = useContext(AppContext)
    const addressMatch = useMatch(path.checkoutAddress)
    const paymentMatch = useMatch(path.checkoutPayment)
    const thankyouMatch = useMatch(path.checkoutThankYou)
    const isAddress = Boolean(addressMatch)
    const isPayment = Boolean(paymentMatch)
    const isThankyou = Boolean(thankyouMatch)

    const { data: checkoutProductData, refetch } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const deleteProductToCheckoutMutation = useMutation({
        mutationFn: (id: string) => checkoutApi.deleteCheckout(id),
        onSuccess: () => {
            refetch()
        }
    })

    const checkoutProduct = checkoutProductData?.data
    const totalPayment = useMemo(
        () =>
            checkoutProduct?.reduce((total, checkout) => {
                return total + checkout.totalPrice
            }, 0),
        [checkoutProduct]
    )

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDeleteProductToCheckout = (id: string) => {
        if (checkoutProduct?.length === 1) {
            setIsCheckout(false)
        }
        deleteProductToCheckoutMutation.mutate(id)
    }

    return (
        <div>
            {/* <Helmet>
                <title>Thanh toán đơn hàng – Hệ Thống Xe máy Hoàng Cầu</title>
                <meta name='description' content='Hệ Thống Xe máy Hoàng Cầu' />
            </Helmet> */}
            <div className='pl-[132px]'>
                <div className='grid grid-cols-12 gap-[67px]'>
                    <div className='col-span-6'>
                        <div className='pt-[49px] h-[100vh]'>
                            <h2 className='text-[28px]'>Vựa Sách Cũ</h2>
                            {!isThankyou && (
                                <div className='flex items-center gap-[7px] text-[13px] mt-[7px]'>
                                    <div className='flex items-center gap-[7px]'>
                                        <Link to={path.cart} className='text-[#2b78a0] '>
                                            Giỏ hàng
                                        </Link>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-3 h-3'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='m8.25 4.5 7.5 7.5-7.5 7.5'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex items-center gap-[7px]'>
                                        <Link
                                            to={path.checkoutAddress}
                                            className={classNames('', {
                                                'text-[#2b78a0] ': !isAddress,
                                                'text-[#333333]': isAddress
                                            })}
                                        >
                                            Thông tin giao hàng
                                        </Link>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className='w-3 h-3'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='m8.25 4.5 7.5 7.5-7.5 7.5'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex items-center gap-[7px]'>
                                        <Link
                                            to={path.checkoutPayment}
                                            className={classNames('', {
                                                'text-[#2b78a0] ': !isPayment,
                                                'text-[#333333]': isPayment
                                            })}
                                        >
                                            Phương thức thanh toán
                                        </Link>
                                    </div>
                                </div>
                            )}

                            <Outlet />
                        </div>
                    </div>

                    <div className='col-span-6'>
                        <div className='pl-[45px] border-l-[1px] border-[#e1e1e1] pt-[49px] bg-[#fafafa] pr-[132px] flex flex-col gap-[16px] h-[100vh]'>
                            {checkoutProduct &&
                                checkoutProduct.map((checkout, index) => (
                                    <div className='flex items-center justify-between' key={index}>
                                        <div className='flex items-center gap-[16px]'>
                                            <div className='w-[64px] h-[64px] rounded-[8px] border-[1px] border-[#e6e6e6] bg-white flex justify-center items-center relative z-[1]'>
                                                <img
                                                    src={checkout.imageUrl}
                                                    alt=''
                                                    className='w-full h-[45px] object-cover'
                                                />
                                                <div className='w-[22px] h-[22px] rounded-full bg-[rgba(163_163_163)] absolute text-white text-[13px] flex items-center justify-center top-[-10px] right-[-10px] z-[2]'>
                                                    {checkout.count}
                                                </div>
                                            </div>
                                            <div className='flex flex-col text-[14px] w-[240px]'>
                                                <p className=' text-[#4b4b4b] truncate'>{checkout.title}</p>
                                                <div
                                                    className=''
                                                    onClick={() => handleDeleteProductToCheckout(checkout.id)}
                                                >
                                                    {' '}
                                                    <p className='text-[12px] text-[#2b78a0] hover:text-[#42ade7] transition duration-200 ease-in cursor-pointer'>
                                                        Hủy đơn
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-[13px] text-[#4b4b4b] '>
                                            {formatCurrency(checkout.totalPrice)}
                                        </p>
                                    </div>
                                ))}
                            <div className='w-full h-[1px] bg-[#e6e6e6]'></div>

                            <div className='flex items-center justify-between text-[14px] text-[#717171]'>
                                <p className=' '>Tạm tính</p>
                                <p className=''>{formatCurrency(totalPayment as number)}</p>
                            </div>

                            {isAddress && (
                                <div className='flex items-center justify-between text-[14px] text-[#717171] -mt-2'>
                                    <p className=' '>Phí vận chuyển</p>
                                    <p className=''>—</p>
                                </div>
                            )}

                            {isPayment && (
                                <div className='flex items-center justify-between text-[14px] text-[#717171] -mt-2'>
                                    <p className=' '>Phí vận chuyển</p>
                                    <p className=''>{formatCurrency(35000)}</p>
                                </div>
                            )}

                            {isThankyou && (
                                <div className='flex items-center justify-between text-[14px] text-[#717171] -mt-2'>
                                    <p className=' '>Phí vận chuyển</p>
                                    <p className=''>{formatCurrency(35000)}</p>
                                </div>
                            )}

                            <div className='w-full h-[1px] bg-[#e6e6e6]'></div>

                            {isAddress && (
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#4b4b4b] text-[16px]'>Tổng tiền</p>
                                    <div className='flex items-center gap-[10px]'>
                                        <p className='text-[12px] text-[#969696]'>VND</p>
                                        <p className='text-[22px] opacity-[0.8]'>
                                            {formatCurrency(totalPayment as number)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isPayment && (
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#4b4b4b] text-[16px]'>Tổng tiền</p>
                                    <div className='flex items-center gap-[10px]'>
                                        <p className='text-[12px] text-[#969696]'>VND</p>
                                        <p className='text-[22px] opacity-[0.8]'>
                                            {formatCurrencySum(totalPayment as number, 35000)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isThankyou && (
                                <div className='flex items-center justify-between'>
                                    <p className='text-[#4b4b4b] text-[16px]'>Tổng tiền</p>
                                    <div className='flex items-center gap-[10px]'>
                                        <p className='text-[12px] text-[#969696]'>VND</p>
                                        <p className='text-[22px] opacity-[0.8]'>
                                            {formatCurrencySum(totalPayment as number, 35000)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
