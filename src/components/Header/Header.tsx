import { useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faRightFromBracket, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import classname from 'classnames/bind'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Header.module.css'
import Popover from '../Popover'
import { navbar } from '~/constants/navbar'
import { path } from '~/constants/path'
import Button from '../Button'
import { AppContext } from '~/contexts/createContext'
import { clearLS, setCheckoutFromLS } from '~/utils/auth'
import { toast } from 'react-toastify'
import { toastNotify } from '~/constants/toastNotify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '~/apis/cart.api'
import { checkoutApi } from '~/apis/checkout.api'
import { formatCurrency, generateNameId } from '~/utils/utils'
import { CartType } from '~/types/cart.type'
import Search from '../Search'
import { purcharseApi } from '~/apis/purcharse.api'

interface Props {
    pageAdmin?: boolean
}

const cx = classname.bind(styles)
export default function Header({ pageAdmin }: Props) {
    const {
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        setIsCheckout,
        setIsAddress,
        setIsThankyou,
        setProductInThankyou
    } = useContext(AppContext)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data: productInCartData, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.getCart()
    })

    const deleteCartMutation = useMutation({
        mutationFn: (id: string) => cartApi.deleteCart(id),
        onSuccess: () => {
            refetch()
        }
    })

    const { data: checkoutProductData, refetch: refresh } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const deleteProductToCheckoutMutation = useMutation({
        mutationFn: (id: string) => checkoutApi.deleteCheckout(id),
        onSuccess: () => {
            refresh()
        }
    })

    const addCheckoutMutation = useMutation({
        mutationFn: (body: CartType) => checkoutApi.addCheckout(body)
    })

    const updateCheckoutMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: CartType }) =>
            checkoutApi.updateProducttoCheckout(bodyData.id, bodyData.body)
    })

    const { data: productInPurcharseData } = useQuery({
        queryKey: ['purcharse'],
        queryFn: () => purcharseApi.getPurcharse()
    })

    const deletePurcharseMutation = useMutation({
        mutationFn: (id: string) => purcharseApi.deleteProductInPurcharse(id)
    })

    const productToCart = productInCartData?.data
    const productCheckout = checkoutProductData?.data
    const productDataCount = productToCart?.length
    const productPurcharse = productInPurcharseData?.data

    const handleDelete = (id: string) => {
        deleteCartMutation.mutate(id)
        toast.success(toastNotify.cart.deleteCart, { autoClose: 2000 })
    }

    const totalPriceConvenientCart = useMemo(
        () => productToCart?.reduce((total, cart) => total + cart.count * cart.price, 0),
        [productToCart]
    )

    const navigatePageCart = () => {
        navigate(path.cart)
    }

    const navigatePageAccount = () => {
        navigate(path.account)
    }

    const navigatePageAdmin = () => {
        navigate(path.adminDashboard)
    }

    const getIdProductSameToCheckout = useMemo(() => {
        return productCheckout?.map((checkout) => checkout.id)
    }, [productCheckout])

    const getIdProductSameToCart = (checked: CartType) => {
        return productCheckout?.find((checkout) => checkout.id === checked.id)
    }

    const handleCheckOut = () => {
        if (productToCart && productToCart.length > 0) {
            productToCart.map((cart) => {
                if (getIdProductSameToCheckout?.includes(cart.id)) {
                    const getIdProduct = getIdProductSameToCart(cart)
                    updateCheckoutMutation.mutate(
                        {
                            id: getIdProduct?.id as string,
                            body: {
                                ...(getIdProduct as CartType),
                                count:
                                    cart.count + (getIdProduct?.count as number) > (getIdProduct?.stock as number)
                                        ? (getIdProduct?.stock as number)
                                        : cart.count + (getIdProduct?.count as number),
                                totalPrice:
                                    (cart.count + (getIdProduct?.count as number)) * (getIdProduct?.price as number)
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
                    {
                        id: cart.id,
                        title: cart.title,
                        imageUrl: cart.imageUrl,
                        price: cart.price,
                        totalPrice: cart.totalPrice,
                        count: cart.count,
                        stock: cart.stock
                    },
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
            productToCart.map((cart) => deleteCartMutation.mutate(cart.id))
        }
        navigate(path.checkoutAddress)
    }

    const handleLogout = () => {
        clearLS()
        setIsAuthenticated(false)
        setProfile(null)
        setIsCheckout(false)
        setIsAddress(false)
        setIsThankyou(false)
        setProductInThankyou([])
        productToCart?.map((cart) => deleteCartMutation.mutate(cart.id))
        productCheckout?.map((checkout) => deleteProductToCheckoutMutation.mutate(checkout.id))
        productPurcharse?.map((purcharse) => deletePurcharseMutation.mutate(purcharse.id))
        toast.success(toastNotify.logOut.logOutSuccess, { autoClose: 2000 })
    }

    return (
        <div className=' bg-[#f3763a]'>
            {!pageAdmin && (
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
                            <Search />
                        </div>
                        <div className='col-span-3 flex justify-end'>
                            {profile?.role === 'admin' ? (
                                <div className='flex items-end gap-3'>
                                    <div
                                        className='text-center text-white w-10 py-2 border-[1px] border-[#fff] text-[16px] cursor-pointer'
                                        onClick={navigatePageAdmin}
                                    >
                                        <FontAwesomeIcon icon={faUserTie} />
                                    </div>
                                    <div
                                        className={cx('flex items-center cursor-pointer relative', {
                                            'blog-cart': true
                                        })}
                                    >
                                        <div
                                            className='flex items-center justify-center gap-2 text-white w-[140px] py-[10.5px] border border-[#fff] text-[13px] z-[2]'
                                            onClick={handleLogout}
                                        >
                                            <p> Xin Chào, Admin !</p>
                                            <div className=''>
                                                <FontAwesomeIcon icon={faRightFromBracket} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex items-end gap-3'>
                                    <div
                                        className='text-center text-white w-10 py-2 border-[1px] border-[#fff] text-[16px] cursor-pointer'
                                        onClick={navigatePageAccount}
                                    >
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                    <Popover
                                        renderPopover={
                                            <>
                                                {productToCart && productToCart?.length > 0 ? (
                                                    <div className='w-[300px] shadow-sm border-[1px] border-[#e5e6ec] bg-white pl-[12px] pb-4'>
                                                        <div
                                                            className={cx(
                                                                'max-h-[246px] flex flex-col overflow-y-auto pr-3',
                                                                {
                                                                    'slide-convenient-cart': true
                                                                }
                                                            )}
                                                        >
                                                            {productToCart.map((product) => (
                                                                <div
                                                                    className='flex gap-3 py-2 border-b-[1px] border-[#ededed] pb-6'
                                                                    key={product.id}
                                                                >
                                                                    <div className='w-[60px] px-1 py-1 border-[1px] border-[#ededed]'>
                                                                        <Link
                                                                            to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}
                                                                            className='w-[60px]'
                                                                        >
                                                                            <img
                                                                                src={product.imageUrl}
                                                                                alt=''
                                                                                className='w-full h-full object-cover cursor-pointer'
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className='w-[180px] flex flex-col gap-2 text-[13px]'>
                                                                        <Link
                                                                            to={`${path.home}${generateNameId({ name: product.title, id: product.id })}`}
                                                                            className=' text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in'
                                                                        >
                                                                            {product.title}
                                                                        </Link>
                                                                        <div className='flex gap-1 text-[14px]'>
                                                                            <p className='text-[#f16325] font-semibold'>
                                                                                {formatCurrency(product.price)}
                                                                            </p>
                                                                            <p>x</p>
                                                                            <p className=''>{product.count}</p>
                                                                        </div>
                                                                    </div>
                                                                    <svg
                                                                        xmlns='http://www.w3.org/2000/svg'
                                                                        fill='none'
                                                                        viewBox='0 0 24 24'
                                                                        strokeWidth={1.5}
                                                                        stroke='currentColor'
                                                                        className='size-5 opacity-[0.8] hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'
                                                                        onClick={() => handleDelete(product.id)}
                                                                    >
                                                                        <path
                                                                            strokeLinecap='round'
                                                                            strokeLinejoin='round'
                                                                            d='M6 18 18 6M6 6l12 12'
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className='mt-5 pr-3'>
                                                            <div className='flex items-center  justify-between text-[14px]'>
                                                                <p className='text-[#555555]'>Tổng tiền:</p>
                                                                <p className='font-semibold text-[#f16325]'>
                                                                    {formatCurrency(totalPriceConvenientCart as number)}
                                                                </p>
                                                            </div>
                                                            <Button
                                                                className='w-full bg-[#f16235] text-[14px] text-white flex items-center justify-center py-2 hover:opacity-[0.9] transtion duration-200 ease-in mt-4'
                                                                onClick={handleCheckOut}
                                                            >
                                                                Thanh toán
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='w-[300px] h-[40px] shadow-sm border-[1px] border-[#e5e6ec] bg-white flex items-center pl-[20px] text-[14px] text-[#5e5d5d]'>
                                                        Không có sản phẩm nào.
                                                    </div>
                                                )}
                                            </>
                                        }
                                        placement='bottom-end'
                                        as='div'
                                        blogTop={82}
                                        blogRight={108}
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
                                                Giỏ hàng {productDataCount}
                                            </div>
                                        </div>
                                    </Popover>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!pageAdmin && (
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
                                    {profile?.role === 'user' && (
                                        <Link
                                            to={path.account}
                                            className='flex items-center gap-1 text-white text-[14px]'
                                        >
                                            <FontAwesomeIcon icon={faUser} className='text-[14px]' />
                                            <p className='text-[14px]'>Tài khoản</p>
                                        </Link>
                                    )}
                                    {profile?.role === 'admin' && (
                                        <Link
                                            to={path.adminDashboard}
                                            className='flex items-center gap-2 text-white text-[14px]'
                                        >
                                            <FontAwesomeIcon icon={faUser} className='text-[14px]' />
                                            <p className='text-[14px]'>Admin</p>
                                        </Link>
                                    )}
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
            )}
        </div>
    )
}
