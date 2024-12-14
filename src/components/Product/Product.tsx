import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cartApi } from '~/apis/cart.api'

import { path } from '~/constants/path'
import { toastNotify } from '~/constants/toastNotify'
import { AppContext } from '~/contexts/createContext'
import { CartType } from '~/types/cart.type'
import { Product as ProductType } from '~/types/product.type'
import { formatCurrency, generateNameId } from '~/utils/utils'

interface Props {
    product: ProductType
    isFlexColumn?: boolean
    setWidthImg?: string
    setHeightImg?: string
    productCategory?: boolean
}

export default function Product({
    product,
    productCategory,
    isFlexColumn,
    setWidthImg = 'w-full',
    setHeightImg = 'h-[242px]'
}: Props) {
    const { isAuthenticated } = useContext(AppContext)

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { data: productInCartData, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.getCart()
    })

    const updateCartMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: CartType }) => cartApi.updateCart(bodyData.id, bodyData.body)
    })

    const productToCart = productInCartData?.data

    const checkIdToCart = useMemo(
        () => productToCart?.find((cart) => cart.id === product.id),
        [product.id, productToCart]
    )

    // goi api Cart de them san pham vao gio hang
    const addToCartMutation = useMutation({
        mutationFn: (body: CartType) => cartApi.addToCart(body)
    })

    const checkProductIdToCart = () => {
        if (productToCart) {
            const checkProduct = productToCart.some((cart) => cart.id === product.id)
            return checkProduct
        }
    }

    const addToCart = () => {
        if (isAuthenticated) {
            if (product) {
                if (!checkProductIdToCart()) {
                    addToCartMutation.mutate(
                        {
                            id: product.id,
                            title: product.title,
                            imageUrl: product.imageUrl,
                            count: 1,
                            price: product.price,
                            totalPrice: product.price * 1,
                            stock: product.stock
                        },
                        {
                            onSuccess: () => {
                                toast.success(toastNotify.productDetail.addtoCartSuccess, { autoClose: 2000 })
                                queryClient.invalidateQueries({ queryKey: ['cart'] })
                            }
                        }
                    )
                    return
                }
                updateCartMutation.mutate(
                    {
                        id: checkIdToCart?.id as string,
                        body: {
                            ...checkIdToCart,
                            count:
                                (checkIdToCart?.count as number) + 1 > product.stock
                                    ? product.stock
                                    : (checkIdToCart?.count as number) + 1,
                            totalPrice: ((checkIdToCart?.count as number) + 1) * (checkIdToCart?.price as number)
                        } as CartType
                    },
                    {
                        onSuccess: () => {
                            toast.success(toastNotify.productDetail.addtoCartSuccess, { autoClose: 2000 })
                            refetch()
                        }
                    }
                )
            }
            return
        }
        navigate(path.login)
    }
    
    return (
        <>
            {!productCategory && (
                <div
                    className={
                        isFlexColumn
                            ? 'pl-3 pr-4 border-[1px] border-[#ececec] w-full h-full pb-1 pt-1'
                            : 'pl-3 pr-4 border-[1px] border-[#ececec] w-full h-full pt-1'
                    }
                >
                    <Link to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}>
                        <img
                            src={product.imageUrl}
                            alt=''
                            className={`${setWidthImg} ${setHeightImg} object-cover cursor-pointer`}
                        />
                    </Link>
                    {isFlexColumn && (
                        <div className='text-[14px] text-[#555555] truncate group'>
                            <Link
                                to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}
                                className='group-hover:text-[#f16325] transtion duration-200 ease-in'
                            >
                                {product.title}
                            </Link>
                        </div>
                    )}

                    {!isFlexColumn && (
                        <div className='text-[14px] text-[#555555] truncate group mt-3'>
                            <Link
                                to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}
                                className='group-hover:text-[#f16325] transtion duration-200 ease-in'
                            >
                                {product.title}
                            </Link>
                        </div>
                    )}

                    {isFlexColumn && (
                        <div>
                            <div>
                                <div className='flex items-center mt-[6px] w-full'>
                                    <div className=''>
                                        <p className='text-[13px] line-through text-[#acacac]'>
                                            {formatCurrency(product.price)}
                                        </p>
                                        <p className='text-[#f16325] text-[16px] font-semibold'>
                                            {formatCurrency(product.price_discount)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <p className='text-[13px] text-[#333333] mt-[1px]'>{`Đã bán ${product.sold}`}</p>
                                <div
                                    className='text-[14px] ml-auto text-[#f16325] border-[1px] border-[#f16325] flex items-center justify-center w-[26px] h-[20px] cursor-pointer'
                                    onClick={addToCart}
                                >
                                    <FontAwesomeIcon icon={faBagShopping} />
                                </div>
                            </div>
                        </div>
                    )}
                    {!isFlexColumn && (
                        <div>
                            <div className='flex items-center mt-[6px] w-full'>
                                <div className='flex items-center gap-3'>
                                    <p className='text-[13px] line-through text-[#acacac]'>
                                        {formatCurrency(product.price)}
                                    </p>
                                    <p className='text-[#f16325] text-[16px] font-semibold'>
                                        {formatCurrency(product.price_discount)}
                                    </p>
                                </div>
                                <div
                                    className='text-[14px] ml-auto text-[#f16325] border-[1px] border-[#f16325] flex items-center justify-center w-[26px] h-[20px] cursor-pointer'
                                    onClick={addToCart}
                                >
                                    <FontAwesomeIcon icon={faBagShopping} />
                                </div>
                            </div>
                            <div className=''>
                                <p className='text-[13px] text-[#333333] mt-[1px]'>{`Đã bán ${product.sold}`}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {productCategory && (
                <div className='w-full h-full flex gap-2'>
                    <Link
                        to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}
                        className='border-[1px] border-[#ebebeb] w-[30%] py-1 flex items-center justify-center px-1 min-h-[100px]'
                    >
                        <img
                            src={product.imageUrl}
                            alt=''
                            className={`${setWidthImg} ${setHeightImg} object-cover cursor-pointer`}
                        />
                    </Link>

                    <div className='flex flex-col w-[70%] pr-2'>
                        <div className='text-[14px] text-[#555555] overflow-ellipsis overflow-hidden line-clamp-2 group mt-3 w-full'>
                            <Link
                                to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}
                                className='group-hover:text-[#f16325] transtion duration-200 ease-in'
                            >
                                {product.title}
                            </Link>
                        </div>

                        <div className='flex items-center mt-[6px] w-full gap-[10px]'>
                            <p className='text-[13px] line-through text-[#acacac]'>{formatCurrency(product.price)}</p>
                            <p className='text-[#f16325] text-[16px] font-semibold'>
                                {formatCurrency(product.price_discount)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
