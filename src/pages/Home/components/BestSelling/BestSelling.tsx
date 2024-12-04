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

    const { data: productListData } = useQuery({
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

    console.log(count)
    return (
        <div className='mt-4 bg-[#f8f9f9]'>
            <div className='max-w-[1142px] mx-auto py-6 relative'>
                <TitleModule
                    icon={faBolt}
                    width='w-[160px]'
                    heading={'Sách bán chạy'}
                    promotion={'Khuyến mãi đã kết thúc'}
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
                                className='h-full w-[229.5px] pl-3 pr-4 border-r-[1px] border-[#ececec]'
                                key={product.id}
                            >
                                <img src={product.imageUrl} alt='' className='w-full h-[242px] object-cover bg-black' />
                                <div className='text-[14px] text-[#555555] truncate group mt-3'>
                                    <Link
                                        to={path.home}
                                        className='group-hover:text-[#f16325] transtion duration-200 ease-in'
                                    >
                                        {product.title}
                                    </Link>
                                </div>
                                <div className='flex items-center gap-2 mt-[6px]'>
                                    <p className='text-[13px] line-through text-[#acacac]'>
                                        {formatCurrency(product.price)}
                                    </p>
                                    <p className='text-[#f16325] text-[16px] font-semibold'>
                                        {formatCurrency(product.price_discount)}
                                    </p>
                                    <div className='text-[14px] ml-10 text-[#f16325] border-[1px] border-[#f16325] flex items-center justify-center w-[26px] h-[20px] cursor-pointer'>
                                        <FontAwesomeIcon icon={faBagShopping} />
                                    </div>
                                </div>
                                <div className=''>
                                    <p className='text-[13px] text-[#333333] mt-[1px]'>{`Đã bán ${product.sold}`}</p>
                                </div>
                            </div>
                        ))}
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
