import TitleModule from '~/components/TitleModule'
import { faBagShopping, faBolt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { useQuery } from '@tanstack/react-query'

import { path } from '~/constants/path'
import styles from './BestSelling.module.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import productApi from '~/apis/product.api'
import { formatCurrency } from '~/utils/utils'
import { titleModule } from '~/constants/titleModule'

const cx = classNames.bind(styles)
export default function BestSelling() {
    const slideRef = useRef<HTMLDivElement | null>(null)
    const slide = useRef<number>(0) // Lưu vị trí cuộn
    const offsetWidth = useRef<number>(0) // Lưu độ rộng của phần tử
    const [count, setCount] = useState<number>(5)

    useEffect(() => {
        if (slideRef.current) {
            slide.current = slideRef.current.scrollLeft
            offsetWidth.current = slideRef.current.offsetWidth
        }
    }, [])

    const { data: productListData, isFetching } = useQuery({
        queryKey: ['product'],
        queryFn: () => productApi.getProductList()
    })

    const productDataBestSell = useMemo(
        () => productListData?.data.filter((product) => product.sold > 200),
        [productListData?.data]
    )

    // xử lí thanh trượt sang phải
    const handleSlideNext = () => {
        if (slideRef.current) {
            if (productDataBestSell) {
                setCount((prev) => prev + 5)
                if (count >= productDataBestSell.length) {
                    setCount((prev) => prev - 5)
                    return
                }
            }
            slide.current += offsetWidth.current
            slideRef.current.scrollLeft = slide.current // Áp dụng vị trí cuộn mới
        }
    }

    // xử lí thanh trượt sang trái
    const handleSlidePrev = () => {
        if (slideRef.current) {
            if (count > 0) {
                setCount((prev) => prev - 5)
            }
            if (slide.current === 0) {
                slide.current = 500
            }
            slide.current -= offsetWidth.current
            slideRef.current.scrollLeft = slide.current // Áp dụng vị trí cuộn mới
        }
    }

    return (
        <div className='mt-4 bg-[#f8f9f9]'>
            <div className='max-w-[1142px] mx-auto py-6 relative'>
                <TitleModule
                    icon={faBolt}
                    width='w-[160px]'
                    heading={titleModule.bestSelling.heading}
                    promotion={titleModule.bestSelling.promotion}
                />
                <div
                    className={cx(
                        'w-[1142px] h-[330px] shadow-sm bg-white flex items-center overflow-x-auto scroll-smooth mt-4',
                        {
                            'bestselling-slide': true
                        }
                    )}
                    ref={slideRef}
                >
                    {productDataBestSell &&
                        productDataBestSell.map((product) => (
                            <div
                                className='h-full min-w-[228.5px] pl-3 pr-4 border-r-[1px] border-[#ececec]'
                                key={product.id}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt=''
                                    className='w-full h-[242px] object-cover cursor-pointer'
                                />
                                <div className='text-[14px] text-[#555555] truncate group mt-3'>
                                    <Link
                                        to={path.home}
                                        className='group-hover:text-[#f16325] transtion duration-200 ease-in'
                                    >
                                        {product.title}
                                    </Link>
                                </div>
                                <div className='flex items-center mt-[6px] w-full'>
                                    <div className='flex items-center gap-3'>
                                        <p className='text-[13px] line-through text-[#acacac]'>
                                            {formatCurrency(product.price)}
                                        </p>
                                        <p className='text-[#f16325] text-[16px] font-semibold'>
                                            {formatCurrency(product.price_discount)}
                                        </p>
                                    </div>
                                    <div className='text-[14px] ml-auto text-[#f16325] border-[1px] border-[#f16325] flex items-center justify-center w-[26px] h-[20px] cursor-pointer'>
                                        <FontAwesomeIcon icon={faBagShopping} />
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='text-[13px] text-[#333333] mt-[1px]'>{`Đã bán ${product.sold}`}</p>
                                </div>
                            </div>
                        ))}

                    {isFetching && (
                        <>
                            {[0, 0, 0, 0, 0].map((_, index) => (
                                <div className='h-full min-w-[228.5px] pl-3 pr-4 animate-none' key={index}>
                                    <div className='flex items-center justify-center w-full h-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 '>
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
                        </>
                    )}

                    {count > 5 && (
                        <button
                            className={cx(
                                'flex items-center justify-center w-5 h-10 bg-[#f16325] absolute left-[-20px] text-[14px]',
                                {
                                    'btn-bestselling-left': true
                                }
                            )}
                            onClick={handleSlidePrev}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    )}

                    {productDataBestSell && count < productDataBestSell.length && (
                        <button
                            className={cx(
                                'flex items-center justify-center w-5 h-10 bg-[#f16325] absolute right-[-20px] text-[14px]',
                                {
                                    'btn-bestselling-right': true
                                }
                            )}
                            onClick={handleSlideNext}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
