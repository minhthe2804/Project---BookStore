import classNames from 'classnames/bind'

import styles from './ProductDetail.module.css'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import TitleModule from '~/components/TitleModule'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import Help from '~/components/Help'
import Policy from '~/components/Policy'
import productApi from '~/apis/product.api'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import Product from '~/components/Product'

const cx = classNames.bind(styles)
export default function ProductDetail() {
    const { data: productListData, isFetching } = useQuery({
        queryKey: ['product'],
        queryFn: () => productApi.getProductList()
    })

    const productDataComic = useMemo(
        () => productListData?.data.filter((product) => product.category === 'Truyện Tranh'),
        [productListData?.data]
    )

    return (
        <div className=''>
            <BreadCrumb title='Sách Bán Chạy' titleProduct='100 bài tập yoga sau sinh giúp mẹ đẹp con khoẻ' />
            <div className='max-w-[1142px] mx-auto'>
                <h1 className='text-[22px] text-[#555555] mt-4'>100 bài tập yoga sau sinh giúp mẹ đẹp con khoẻ</h1>
                <div className='grid grid-cols-12 gap-[32px] mt-2'>
                    <div className='col-span-5'>
                        <div className='flex items-center justify-center border-[1px] border-[#ebebeb] w-[424px] h-[398px]'>
                            <figure className='relative w-[278px] h-full overflow-hidden cursor-zoom-in'>
                                <img
                                    src='https://product.hstatic.net/200000612501/product/100_bai_tap_yoga_sau_sinh_giup_me_dep_con_khoe_b6b7ad54e1284d18b9b1750e9d833cdb_large.jpg'
                                    alt=''
                                    className='pointer-events-none absolute top-0 left-0 w-full h-full object-cover'
                                />
                            </figure>
                        </div>
                    </div>
                    <div className='col-span-7 '>
                        <div className='border-[1px] border-[#ebebeb] px-4 pb-[38px]'>
                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px] '>Tác giả</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>Luc Dopont</p>
                            </div>

                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px] '>Nhà xuất bản</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>Luc Dopont</p>
                            </div>

                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px]'>Ngày xuất bản</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>12/12/2024</p>
                            </div>

                            <div className='flex items-center gap-3 text-[14px]'>
                                <p className='text-[#6a6a6a] font-bold w-[99px] '>Tình trạng</p>
                                <div className='w-[13px] h-[1px] rotate-90 bg-[#ebebeb]'></div>
                                <p className='text-[#898989]'>Còn hàng</p>
                            </div>

                            <div className='flex items-center gap-5 mt-3'>
                                <p className='text-[29px] text-[#f16325] font-semibold '>39,000₫</p>
                                <p className='text-[#acacac] text-[21px] line-through'>96,000₫</p>
                            </div>

                            <div className='w-full h-[1px] bg-[#ebebeb] mt-4'></div>

                            <div className='text-[14px] text-[#555555] overflow-ellipsis overflow-hidden line-clamp-4 mt-4'>
                                <p className=''>
                                    Cuốn sách '1001 Ý Tưởng Đột Phá Trong Quảng Cáo' của Luc Dopont là một hướng dẫn
                                    toàn diện dành cho các nhà tiếp thị và sáng tạo quảng cáo. Sách tập trung vào việc
                                    cung cấp những ý tưởng thực tiễn, từ cách thiết kế thông điệp, lựa chọn hình ảnh,
                                    đến việc tối ưu hóa hiệu quả truyền thông. Được viết dựa trên kinh nghiệm thực tế,
                                    sách giải thích chi tiết những gì nên và không nên làm trong quảng cáo, đồng thời
                                    cung cấp nhiều ví dụ minh họa cụ thể và các bài học từ các chiến dịch nổi tiếng. Đây
                                    là tài liệu không thể thiếu dành cho những ai mong muốn đạt được sự đột phá trong
                                    các chiến lược tiếp thị, phù hợp cho cả người mới bắt đầu lẫn những chuyên gia muốn
                                    nâng cao kỹ năng.
                                </p>
                            </div>

                            <div className='w-full h-[1px] bg-[#ebebeb] mt-4'></div>
                            <p className='text-[14px] text-[#555555] mt-2'>Số lượng:</p>

                            <div className='flex items-center gap-5 mt-2'>
                                <QuantityController
                                    border='border-[#dddddd]'
                                    setHeightInput='py-[11px]'
                                    setHeightBtn='py-[22px]'
                                    setWidthBtn='w-10'
                                />
                                <div className='flex items-center gap-2'>
                                    <button
                                        className={cx(
                                            'flex items-center justify-center w-[52px] bg-[#f16325] text-white text-[20px] py-[14px] border-[1px] border-transparent transition-all duration-200 ease-in',
                                            {
                                                'btn-addtocart': true
                                            }
                                        )}
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
                                        // onClick={buyNow}
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
                    {productDataComic &&
                        productDataComic.map((product) => (
                            <div className='col-span-3' key={product.id}>
                                <Product product={product} setWidthImg='w-[90px]' setHeightImg='' productCategory/>
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
