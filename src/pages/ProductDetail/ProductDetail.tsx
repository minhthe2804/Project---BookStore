import { useContext, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames/bind'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import styles from './ProductDetail.module.css'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import TitleModule from '~/components/TitleModule'
import Help from '~/components/Help'
import Policy from '~/components/Policy'
import productApi from '~/apis/product.api'
import Product from '~/components/Product'
import { ProductsConfig } from '~/types/product.type'
import { formatCurrency, formatDate, getIdFromNameId } from '~/utils/utils'
import { AppContext } from '~/contexts/createContext'
import { CartType } from '~/types/cart.type'
import { cartApi } from '~/apis/cart.api'
import { toastNotify } from '~/constants/toastNotify'
import { path } from '~/constants/path'
import { checkoutApi } from '~/apis/checkout.api'
import { setCheckoutFromLS } from '~/utils/auth'

const cx = classNames.bind(styles)
export default function ProductDetail() {
    const [buyCount, setByCount] = useState<number>(1)
    const { nameId } = useParams() // lấy param để tiến hành gọi api sản phẩm
    const imageRef = useRef<HTMLImageElement>(null) // sử dụng để lấy Dom của bức ảnh thực hiện chức năng Zoom
    const [zoomImage, setZoomImage] = useState<boolean>(false) //
    const id = getIdFromNameId(nameId as string) // thực hiện loại bỏ những thành phần không cần thiết chỉ lấy mỗi id
    const queryClient = useQueryClient() // để cập nhật được data mới nhất
    const { isAuthenticated, setIsCheckout } = useContext(AppContext)

    const navigate = useNavigate() // dùng để chuyển route
    // gọi api xem chi tiết sản phẩm
    const { data: productDetail } = useQuery({
        queryKey: ['productDetail', id],
        queryFn: () => productApi.getProductDetail(id)
    })

    const productData = productDetail?.data // truy xuất đến data thật
    const queryConfig: ProductsConfig = { category: productData?.category } // custom queryconfig chỉ lấy category dựa theo sản phẩm đang xem chi tiết

    // gọi api sản phẩm tương tự cùng category
    const { data: productCategoryData, isFetching } = useQuery({
        queryKey: ['product', queryConfig],
        queryFn: () => productApi.getProduct(queryConfig)
    })

    const productCategory = productCategoryData?.data // truy xuất đến mảng đang chứa các sản phẩm để lặp và render ra giao diện

    // loại bỏ sản phẩm đang xem chi tiết ở sản phẩm tương tự
    const removeProductDetail = useMemo(() => {
        return productCategory?.filter((product) => product.id !== productData?.id)
    }, [productCategory, productData?.id])

    // goi api lấy tất cả sản phẩm trong giỏ hàng
    const { data: productInCartData } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.getCart()
    })

    const productToCart = productInCartData?.data // truy xuất đến mảng đang chứa các sản phẩm để lặp và render ra giao diện

    // goi api Cart de them san pham vao gio hang
    const addToCartMutation = useMutation({
        mutationFn: (body: CartType) => cartApi.addToCart(body)
    })

    // gọi api để cập nhật sản phẩm nếu đã có sản phẩm trong giỏ hàng thì tăng số lượng lên chứ không thêm sản phẩm mới
    const updateCartMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: CartType }) => cartApi.updateCart(bodyData.id, bodyData.body)
    })

    // tìm kiếm sản phẩm chuẩn bị thêm vào giỏ hàng nhưng đã có trước đó trong giỏ hàng và để cập nhật sản phẩm này trong giỏ hàng
    const existingProductByIdInCart = useMemo(
        () => productToCart?.find((cart) => cart.id === productData?.id),
        [productData?.id, productToCart]
    )

    // goi api lấy tất cả sản phẩm trong checkout
    const { data: productCheckoutInData, refetch } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const productCheckout = productCheckoutInData?.data // truy xuất đến mảng đang chứa các sản phẩm để lặp và render ra giao diện

    // goi api checkout de them san pham vao checkout
    const addProductToCheckout = useMutation({
        mutationFn: (body: CartType) => checkoutApi.addCheckout(body)
    })

    // gọi api để cập nhật sản phẩm nếu đã có sản phẩm trong checkout thì tăng số lượng lên chứ không thêm sản phẩm mới
    const updateCheckoutMutation = useMutation({
        mutationFn: (bodyData: { id: string; body: CartType }) =>
            checkoutApi.updateProducttoCheckout(bodyData.id, bodyData.body)
    })

    // tìm kiếm sản phẩm chuẩn bị thêm vào checkout nhưng đã có trước đó trong checkout và để cập nhật sản phẩm này trong checkout
    const existingProductByIdInCheckout = useMemo(
        () => productCheckout?.find((checkout) => checkout.id === productData?.id),
        [productCheckout, productData?.id]
    )

    // Thực hiện logic zoom
    const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setZoomImage(true)
        const rect = event.currentTarget.getBoundingClientRect()
        const image = imageRef.current as HTMLImageElement
        const { naturalWidth, naturalHeight } = image
        // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
        const { offsetX, offsetY } = event.nativeEvent

        // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
        // const offsetX = event.pageX - (rect.x + window.scrollX)
        // const offsetY = event.pageY - (rect.y + window.scrollY)

        const top = offsetY * (1 - naturalHeight / rect.height)
        const left = offsetX * (1 - naturalWidth / rect.width)
        image.style.width = naturalWidth + 'px'
        image.style.height = naturalHeight + 'px'
        image.style.maxWidth = 'unset'
        image.style.top = top + 'px'
        image.style.left = left + 'px'
    }

    // khi không zoom nữa chả về thuộc tính ban đầu
    const handleRemoveZoom = () => {
        imageRef.current?.removeAttribute('style')
        setZoomImage(false)
    }

    // tăng số lượng sản phẩm
    const handleBuyCount = (value: number) => {
        setByCount(value)
    }

    // Lấy ra id của sản phẩm trong giỏ hàng
    const getIdProductSameToCart = useMemo(() => {
        return productToCart?.map((cart) => cart.id)
    }, [productToCart])

    //  kiểm tra từ id productData?.id xem đã có sản phẩm trong giỏ hàng chưa
    const checkIdProductSameToCart = () => {
        return getIdProductSameToCart?.includes(productData?.id as string)
    }

    // Lấy ra id của sản phẩm trong checkout
    const getIdProductSameToCheckout = useMemo(() => {
        return productCheckout?.map((checkout) => checkout.id)
    }, [productCheckout])

    //  kiểm tra từ id productData?.id xem đã có sản phẩm trong giỏ hàng chưa
    const checkIdProductSameToCheckout = () => {
        return getIdProductSameToCheckout?.includes(productData?.id as string)
    }

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = () => {
        if (isAuthenticated) {
            if (productData) {
                if (!checkIdProductSameToCart()) {
                    addToCartMutation.mutate(
                        {
                            id: productData.id,
                            title: productData.title,
                            imageUrl: productData.imageUrl,
                            count: buyCount,
                            price: productData.price_discount,
                            totalPrice: productData.price_discount * buyCount,
                            stock: productData.stock
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
                        id: existingProductByIdInCart?.id as string,
                        body: {
                            ...existingProductByIdInCart,
                            count:
                                (existingProductByIdInCart?.count as number) + buyCount > productData.stock
                                    ? productData.stock
                                    : (existingProductByIdInCart?.count as number) + buyCount,
                            totalPrice:
                                ((existingProductByIdInCart?.count as number) + buyCount) *
                                (existingProductByIdInCart?.price as number)
                        } as CartType
                    },
                    {
                        onSuccess: () => {
                            toast.success(toastNotify.productDetail.addtoCartSuccess, { autoClose: 2000 })
                            queryClient.invalidateQueries({ queryKey: ['cart'] })
                        }
                    }
                )
            }
            return
        }
        navigate(path.login)
    }

    // Mua ngay sản phẩm chuyển đến phần checkout
    const buyNow = () => {
        if (isAuthenticated) {
            if (productData) {
                if (!checkIdProductSameToCheckout()) {
                    addProductToCheckout.mutate({
                        id: productData.id,
                        title: productData.title,
                        imageUrl: productData.imageUrl,
                        count: buyCount,
                        price: productData.price_discount,
                        totalPrice: productData.price_discount * buyCount,
                        stock: productData.stock
                    })
                    setCheckoutFromLS('ok')
                    setIsCheckout(true)
                    navigate(path.checkout)
                    return
                }
                updateCheckoutMutation.mutate(
                    {
                        id: existingProductByIdInCheckout?.id as string,
                        body: {
                            ...existingProductByIdInCheckout,
                            count:
                                (existingProductByIdInCheckout?.count as number) + buyCount > productData.stock
                                    ? productData.stock
                                    : (existingProductByIdInCheckout?.count as number) + buyCount,
                            totalPrice:
                                ((existingProductByIdInCheckout?.count as number) + buyCount) *
                                (existingProductByIdInCheckout?.price as number)
                        } as CartType
                    },
                    {
                        onSuccess: () => {
                            refetch()
                        }
                    }
                )
                setCheckoutFromLS('ok')
                setIsCheckout(true)
                navigate(path.checkout)
            }
            return
        }
        navigate(path.login)
    }

    return (
        <div className=''>
            <BreadCrumb title={productData?.category} titleProduct={productData?.title} />
            <div className='max-w-[1142px] mx-auto'>
                <h1 className='text-[22px] text-[#555555] mt-4'>{productData?.title}</h1>
                <div className='grid grid-cols-12 gap-[32px] mt-2'>
                    <div className='col-span-5'>
                        <div
                            className='flex items-center justify-center border-[1px] border-[#ebebeb] w-[424px] h-[398px]'
                            onMouseMove={handleZoom}
                            onMouseLeave={handleRemoveZoom}
                        >
                            <figure
                                className={
                                    zoomImage
                                        ? 'relative w-full h-full overflow-hidden cursor-zoom-in'
                                        : 'relative w-[278px] h-[360px] overflow-hidden cursor-zoom-in'
                                }
                            >
                                <img
                                    src={productData?.featured_image}
                                    alt=''
                                    className='pointer-events-none absolute top-0 left-0 w-full h-full object-cover'
                                    ref={imageRef}
                                />
                            </figure>
                        </div>
                    </div>
                    <div className='col-span-7 '>
                        <div className='border-[1px] border-[#ebebeb] px-4 pb-[38px]'>
                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px] '>Tác giả</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>{productData?.author}</p>
                            </div>

                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px] '>Nhà xuất bản</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>{productData?.publisher}</p>
                            </div>

                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px]'>Ngày xuất bản</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>{formatDate(productData?.published_at as string)}</p>
                            </div>

                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px] '>Tình trạng</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>Còn hàng</p>
                            </div>

                            <div className='flex items-center gap-5 mt-3'>
                                <p className='text-[29px] text-[#f16325] font-semibold '>
                                    {formatCurrency(productData?.price_discount as number)}
                                </p>
                                <p className='text-[#acacac] text-[21px] line-through'>
                                    {' '}
                                    {formatCurrency(productData?.price as number)}
                                </p>
                            </div>

                            <div className='w-full h-[1px] bg-[#ebebeb] mt-4'></div>

                            <div className='text-[14px] text-[#555555] overflow-ellipsis overflow-hidden line-clamp-4 mt-4'>
                                <p className=''>{productData?.description}</p>
                            </div>

                            <div className='w-full h-[1px] bg-[#ebebeb] mt-4'></div>
                            <p className='text-[14px] text-[#555555] mt-2'>Số lượng:</p>

                            <div className='flex items-center gap-5 mt-2'>
                                <QuantityController
                                    border='border-[#dddddd]'
                                    setHeightInput='py-[11px]'
                                    setHeightBtn='py-[22px]'
                                    setWidthBtn='w-10'
                                    onDecrease={handleBuyCount}
                                    onIncrease={handleBuyCount}
                                    onType={handleBuyCount}
                                    value={buyCount}
                                    max={productData?.stock}
                                />
                                <div className='flex items-center gap-2'>
                                    <button
                                        className={cx(
                                            'flex items-center justify-center w-[52px] bg-[#f16325] text-white text-[20px] py-[14px] border-[1px] border-transparent transition-all duration-200 ease-in',
                                            {
                                                'btn-addtocart': true
                                            }
                                        )}
                                        onClick={addToCart}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            strokeWidth={1.5}
                                            stroke='currentColor'
                                            className={cx('size-5 transition duration-200 ease-in', {
                                                'icon-bagshopping': true
                                            })}
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                                            />
                                        </svg>
                                    </button>
                                    <Button
                                        className={cx(
                                            'w-[174px] py-[13.5px] bg-[#f16325] text-[14px] font-[600] text-white  transition-all duration-200 ease-in flex items-center justify-center border-[1px] border-transparent',
                                            {
                                                // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center pointer-events-none border-[1px] border-transparent':
                                                //     addToCartMutation.isPending
                                                'btn-buynow': true
                                            }
                                        )}
                                        onClick={buyNow}
                                        // isLoading={addToCartMutation.isPending}
                                        // disabled={addToCartMutation.isPending}
                                    >
                                        MUA NGAY
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-[122px]'>
                    <TitleModule icon={faBook} heading='Sản phẩm cùng loại' width='w-[208px]' />
                </div>

                <div className='grid grid-cols-12 mt-2 gap-3'>
                    {removeProductDetail &&
                        removeProductDetail.map((product) => (
                            <div className='col-span-3' key={product.id}>
                                <Product
                                    product={product}
                                    setWidthImg='w-[90px]'
                                    setHeightImg='h-[90px]'
                                    productCategory
                                />
                            </div>
                        ))}
                </div>

                {isFetching && (
                    <div className='grid grid-cols-12 gap-[32px] mt-[49px] animate-none'>
                        {[0, 0, 0, 0, 0, 0, 0, 0].map((_, index) => (
                            <div className='col-span-3' key={index}>
                                <div className='flex items-center justify-center w-[100px] h-[100px] border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 '>
                                    <div role='status'>
                                        <svg
                                            aria-hidden='true'
                                            className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                                            viewBox='0 0 100 101'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                                fill='currentColor'
                                            />
                                            <path
                                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                                fill='currentFill'
                                            />
                                        </svg>
                                        <span className='sr-only'>Loading...</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Help />
                <Policy />
            </div>
        </div>
    )
}
