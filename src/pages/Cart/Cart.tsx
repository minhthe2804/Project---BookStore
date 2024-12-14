import { useContext, useEffect, useMemo } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import keyBy from 'lodash/keyBy'
import { produce } from 'immer'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import styles from './Cart.module.css'
import Help from '~/components/Help'
import Policy from '~/components/Policy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '~/apis/cart.api'
import { formatCurrency } from '~/utils/utils'
import { AppContext } from '~/contexts/createContext'
import { toast } from 'react-toastify'
import { toastNotify } from '~/constants/toastNotify'
import { CartType } from '~/types/cart.type'
import { checkoutApi } from '~/apis/checkout.api'
import { setCheckoutFromLS } from '~/utils/auth'

const cx = classNames.bind(styles)
export default function Cart() {
    const { extendedCart, setExtendedCart, setIsCheckout } = useContext(AppContext)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { data: productInCartData, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.getCart()
    })

    const productToCart = productInCartData?.data

    const updateCartMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: CartType }) => cartApi.updateCart(bodyData.id, bodyData.body)
    })

    const deleteCartMutation = useMutation({
        mutationFn: (id: string) => cartApi.deleteCart(id),
        onSuccess: () => {
            refetch()
        }
    })

    const { data: productInCheckoutData, refetch: refresh } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const productCheckout = productInCheckoutData?.data

    const addCheckoutMutation = useMutation({
        mutationFn: (body: CartType) => checkoutApi.addCheckout(body)
    })

    const updateCheckoutMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: CartType }) =>
            checkoutApi.updateProducttoCheckout(bodyData.id, bodyData.body)
    })

    useEffect(() => {
        setExtendedCart((prev) => {
            const extendedCartObject = keyBy(prev, 'id')
            return (
                productToCart?.map((cart) => {
                    return {
                        ...cart,
                        disabled: false,
                        checked: Boolean(extendedCartObject[cart.id]?.checked)
                    }
                }) || []
            )
        })
    }, [productToCart, setExtendedCart])

    useEffect(() => {
        return () => {
            history.replaceState(null, '')
        }
    }, [])

    const isAllChecked = useMemo(
        () => (extendedCart.length > 0 ? extendedCart.every((cart) => cart.checked) : false),
        [extendedCart]
    )

    const checkedCart = useMemo(() => extendedCart.filter((cart) => cart.checked), [extendedCart])
    const checkedCartCount = checkedCart.length

    const totalCheckedCartPrice = useMemo(
        () =>
            checkedCart.reduce((total, cart) => {
                return total + cart.price * cart.count
            }, 0),
        [checkedCart]
    )

    const handleCheck = (cartIndex: string | number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked
        setExtendedCart((prev) => {
            return prev.map((cart) => {
                const isChecked = cart.id === cartIndex ? checked : cart.checked
                return {
                    ...cart,
                    checked: isChecked
                }
            })
        })
    }

    const handleCheckAll = () => {
        setExtendedCart((prev) =>
            prev.map((cart) => ({
                ...cart,
                checked: !isAllChecked
            }))
        )
    }

    const handleTypeQuantity = (cartIndex: number) => (value: number) => {
        setExtendedCart(
            produce((draft) => {
                draft[cartIndex].count = value
            })
        )
    }

    const handleQuantity = (cartIndex: number, value: number, enable: boolean) => {
        if (enable) {
            const cart = extendedCart[cartIndex]
            setExtendedCart(
                produce((draft) => {
                    draft[cartIndex].disabled = true
                })
            )
            const bodyData = {
                id: cart.id,
                body: {
                    ...cart,
                    count: value,
                    totalPrice: cart.price * value
                }
            }
            updateCartMutation.mutate(bodyData, {
                onSuccess: () => {
                    refetch()
                    toast.success(toastNotify.cart.updateCart, { autoClose: 2000 })
                }
            })
        }
    }

    const handleDelete = (id: string) => {
        deleteCartMutation.mutate(id)
        toast.success(toastNotify.cart.deleteCart, { autoClose: 2000 })
    }

    const handleDeleteAll = () => {
        if (checkedCart.length > 0) {
            checkedCart.map((cart) =>
                deleteCartMutation.mutate(cart.id, {
                    onSuccess: () => {
                        refetch()
                    }
                })
            )
            toast.success(toastNotify.cart.deleteCart, { autoClose: 2000 })
        }
    }

    const getIdProductSameToCheckout = useMemo(() => {
        return productCheckout?.map((checkout) => checkout.id)
    }, [productCheckout])

    const getIdProductSameToCart = (checked: CartType) => {
        return productCheckout?.find((checkout) => checkout.id === checked.id)
    }

    const handleCheckOut = () => {
        if (checkedCart.length > 0) {
            checkedCart.map((checked) => {
                if (getIdProductSameToCheckout?.includes(checked.id)) {
                    const getIdProduct = getIdProductSameToCart(checked)
                    updateCheckoutMutation.mutate(
                        {
                            id: getIdProduct?.id as string,
                            body: {
                                ...checked,
                                count:
                                    checked.count + (getIdProduct?.count as number) > (getIdProduct?.stock as number)
                                        ? (getIdProduct?.stock as number)
                                        : checked.count + (getIdProduct?.count as number),
                                totalPrice:
                                    (checked.count + (getIdProduct?.count as number)) * (getIdProduct?.price as number)
                            }
                        },
                        {
                            onSuccess: () => {
                                queryClient.invalidateQueries({ queryKey: ['checkout'] })
                                refresh()
                            }
                        }
                    )
                    return
                }
                addCheckoutMutation.mutate(
                    { ...checked },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ['checkout'] })
                            refresh()
                        }
                    }
                )
            })
            setCheckoutFromLS('ok')
            setIsCheckout(true)
            refresh()
            checkedCart.map((cart) => deleteCartMutation.mutate(cart.id))
        }
        navigate(path.checkoutAddress)
    }

    return (
        <div>
            <BreadCrumb title={breadCrumb.cart.title} />
            <div className='max-w-[1142px] mx-auto mt-[30px]'>
                <h1 className='text-[24px] text-[#323c3f]'>Giỏ hàng</h1>

                {extendedCart.length > 0 ? (
                    <>
                        <div className='grid grid-cols-12 border-[1px] border-[#ebebeb] mt-[26px]'>
                            <div className='col-span-2 py-3 border-r-[1px] border-[#ebebeb]'>
                                <div className='flex items-center justify-center'>
                                    <p className='text-[14px] text-[#555555]'>Ảnh sản phẩm</p>
                                </div>
                            </div>
                            <div className='col-span-3 py-3 border-r-[1px] border-[#ebebeb]'>
                                <div className='flex items-center justify-center'>
                                    <p className='text-[14px] text-[#555555]'>Tên sản phẩm</p>
                                </div>
                            </div>
                            <div className='col-span-2 py-3 border-r-[1px] border-[#ebebeb]'>
                                <div className='flex items-center justify-center'>
                                    <p className='text-[14px] text-[#555555]'>Đơn giá</p>
                                </div>
                            </div>
                            <div className='col-span-2 py-3 border-r-[1px] border-[#ebebeb]'>
                                <div className='flex items-center justify-center'>
                                    <p className='text-[14px] text-[#555555]'>Số lượng</p>
                                </div>
                            </div>
                            <div className='col-span-2 py-3 border-r-[1px] border-[#ebebeb]'>
                                <div className='flex items-center justify-center'>
                                    <p className='text-[14px] text-[#555555]'>Thành tiền</p>
                                </div>
                            </div>
                            <div className='col-span-1 py-3'>
                                <div className='flex items-center justify-center'>
                                    <p className='text-[14px] text-[#555555]'>Xoá</p>
                                </div>
                            </div>
                        </div>

                        {extendedCart.map((cart, index) => (
                            <div className='grid grid-cols-12' key={cart.id}>
                                <div className='col-span-2'>
                                    <div className='flex gap-3 justify-center relative'>
                                        <div className='absolute left-0 top-[50%] -translate-y-1/2'>
                                            <input
                                                type='checkbox'
                                                className='h-5 w-5 accent-[#f16325]'
                                                checked={cart.checked}
                                                onChange={handleCheck(cart.id)}
                                            />
                                        </div>
                                        <div className='flex items-center justify-center py-8 min-h-[162px]'>
                                            <Link to={path.home}>
                                                <img src={cart.imageUrl} alt='' className='w-[100px] object-cover' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-3'>
                                    <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                                        <Link to={path.home} className=''>
                                            <p className='text-[14px] text-[#555555] hover:text-[#f16325] transtion ease-in duration-200'>
                                                {cart.title}
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                                        <p className='text-[14px] text-[#f16325] font-semibold'>
                                            {formatCurrency(cart.price)}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                                        <QuantityController
                                            border='border-[#dddddd]'
                                            setHeightInput='py-[3px]'
                                            setHeightBtn='py-[14px]'
                                            setWidthBtn='w-[25px]'
                                            setWidthIcon='w-[8px]'
                                            setColorIcon='bg-[#555555]'
                                            onIncrease={(value) => handleQuantity(index, value, value <= cart.stock)}
                                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                            onType={handleTypeQuantity(index)}
                                            onFocusOut={(value) =>
                                                handleQuantity(
                                                    index,
                                                    value,
                                                    value >= 1 &&
                                                        value <= cart.stock &&
                                                        value !== (productToCart as CartType[])[index].count
                                                )
                                            }
                                            disabled={cart.disabled}
                                            value={cart.count}
                                            max={cart.stock}
                                        />
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                                        <p className='text-[14px] text-[#f16325] font-semibold'>
                                            {formatCurrency(cart.totalPrice)}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className='hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'
                                            onClick={() => handleDelete(cart.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='w-full h-[1px] bg-[#ebebeb]'></div>

                        <div className='w-full flex mt-[21px]'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex gap-5 text-[#333333] text-[15px]'>
                                    <input
                                        type='checkbox'
                                        className='h-5 w-5 accent-[#f35539]'
                                        checked={isAllChecked}
                                        onChange={handleCheckAll}
                                    />
                                    <p>Chọn tất cả ({checkedCartCount})</p>
                                    <p
                                        className='cursor-pointer hover:text-[#ff3237] transition duration-200 ease-in'
                                        onClick={handleDeleteAll}
                                    >
                                        Xóa
                                    </p>
                                </div>
                                <Link
                                    to={path.home}
                                    className={cx(
                                        'w-[188px] h-[40px] bg-[#f16325] text-[14px] font-[600] text-white transition-all duration-200 ease-in flex items-center justify-center border-[1px] border-transparent',
                                        {
                                            'btn-continue': true
                                        }
                                    )}
                                >
                                    TIẾP TỤC MUA HÀNG
                                </Link>
                            </div>
                            <div className='ml-auto flex flex-col'>
                                <div className='flex items-center border-[1px] border-[#ebebeb]'>
                                    <div className='w-[293px] h-[43px] text-[14px] text-[#1c1c1c] flex items-center pl-4'>
                                        <p className=''>Tổng thanh toán ({checkedCartCount} sản phẩm):</p>
                                    </div>
                                    <div className='w-[167px] h-[43px] text-[14px] text-[#f16325] font-semibold flex items-center justify-end pr-4 border-l-[1px] border-[#ebebeb]'>
                                        <p className=''>{formatCurrency(totalCheckedCartPrice)}</p>
                                    </div>
                                </div>
                                <Button
                                    className={cx(
                                        'w-[462px] py-[11px] bg-[#f16325] text-[14px] font-[600] text-white  transition-all duration-200 ease-in flex items-center justify-center border-[1px] border-transparent mt-5',
                                        {
                                            // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center pointer-events-none border-[1px] border-transparent':
                                            //     addToCartMutation.isPending
                                            'btn-payment': true
                                        }
                                    )}
                                    onClick={handleCheckOut}
                                    // isLoading={addToCartMutation.isPending}
                                    // disabled={addToCartMutation.isPending}
                                >
                                    TIẾN HÀNH THANH TOÁN
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center mt-[20px]'>
                        <img
                            className='py-2 w-[300px] grayscale'
                            src='https://simbaeshop.com/images/cart-empty.png'
                            alt=''
                        />

                        <p className='mt-[20px] text-[20px] font-[600] text-[#333333] uppercase opacity-[0.8]'>
                            Giỏ hàng của bạn đang trống
                        </p>

                        <Link
                            to={path.home}
                            className=' mt-[20px] block w-[120px] py-[8px] bg-[#f16325] text-center rounded-[4px] text-[15px] text-white font-semibold hover:opacity-[0.9] transition duration-200 ease-in'
                        >
                            MUA NGAY
                        </Link>
                    </div>
                )}
            </div>
            <div className='mt-[61px]'>
                <Help />
                <Policy />
            </div>
        </div>
    )
}
