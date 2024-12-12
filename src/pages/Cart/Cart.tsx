import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'

import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import QuantityController from '~/components/QuantityController'
import { breadCrumb } from '~/constants/breadCrumb'
import { path } from '~/constants/path'
import styles from './Cart.module.css'
import Help from '~/components/Help'
import Policy from '~/components/Policy'

const cx = classNames.bind(styles)
export default function Cart() {
    return (
        <div>
            <BreadCrumb title={breadCrumb.cart.title} />
            <div className='max-w-[1142px] mx-auto mt-[30px]'>
                <h1 className='text-[24px] text-[#323c3f]'>Giỏ hàng</h1>
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
                <div className='grid grid-cols-12'>
                    <div className='col-span-2'>
                        <div className='flex items-center justify-center py-8 min-h-[162px]'>
                            <Link to={path.home}>
                                <img
                                    src='https://product.hstatic.net/200000612501/product/150_ky_hieu_ngon_ngu_giup_cha_me_va_tre_so_sinh_hieu_nhau_f13bcaf7e61a45fa941eb6b222f1b7ff_compact.jpg'
                                    alt=''
                                    className='w-[66px] object-cover'
                                />
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                            <Link to={path.home} className=''>
                                <p className='text-[14px] text-[#555555] hover:text-[#f16325] transtion ease-in duration-200'>
                                    150 Ký Hiệu Ngôn Ngữ Giúp Cha Mẹ Và Trẻ Sơ Sinh Hiểu Nhau
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                            <p className='text-[14px] text-[#f16325] font-semibold'>39,000₫</p>
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
                                // onDecrease={handleBuyCount}
                                // onIncrease={handleBuyCount}
                                // onType={handleBuyCount}
                                // value={buyCount}
                                // max={productData?.stock}
                            />
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                            <p className='text-[14px] text-[#f16325] font-semibold'>39,000₫</p>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex items-center justify-center py-8 px-2 text-center min-h-[162px]'>
                            <FontAwesomeIcon
                                icon={faTrash}
                                className='hover:text-[#ff3237] transtion duration-200 ease-in cursor-pointer'
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-[#ebebeb]'></div>

                <div className='w-full flex items-center mt-[21px]'>
                    <Button
                        className={cx(
                            'w-[188px] py-[8px] bg-[#f16325] text-[14px] font-[600] text-white  transition-all duration-200 ease-in flex items-center justify-center border-[1px] border-transparent',
                            {
                                // 'w-[126px] py-[9px] bg-[#ff3237] opacity-[0.8] rounded-[30px] text-[14px] font-[600] text-[#333333] flex items-center justify-center pointer-events-none border-[1px] border-transparent':
                                //     addToCartMutation.isPending
                                'btn-continue': true
                            }
                        )}
                        // onClick={buyNow}
                        // isLoading={addToCartMutation.isPending}
                        // disabled={addToCartMutation.isPending}
                    >
                        TIẾP TỤC MUA HÀNG
                    </Button>
                    <div className='ml-auto flex flex-col'>
                        <div className='flex items-center border-[1px] border-[#ebebeb]'>
                            <div className='w-[293px] h-[43px] text-[14px] text-[#1c1c1c] flex items-center pl-4'>
                                <p className=''>Tổng tiền thanh toán</p>
                            </div>
                            <div className='w-[167px] h-[43px] text-[14px] text-[#f16325] font-semibold flex items-center justify-end pr-4 border-l-[1px] border-[#ebebeb]'>
                                <p className=''>117,000₫</p>
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
                            // onClick={buyNow}
                            // isLoading={addToCartMutation.isPending}
                            // disabled={addToCartMutation.isPending}
                        >
                            TIẾN HÀNH THANH TOÁN
                        </Button>
                    </div>
                </div>

                <Help />
                <Policy />
            </div>
        </div>
    )
}
