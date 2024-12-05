import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

import { Product as ProductType } from '~/types/product.type'
import { formatCurrency } from '~/utils/utils'

interface Props {
    product: ProductType
}

export default function Product({ product }: Props) {
    return (
        <div className='pl-3 pr-4 border-[1px] border-[#ececec] w-full h-full'>
            <img src={product.imageUrl} alt='' className='w-full h-[242px] object-cover cursor-pointer' />
            <div className='text-[14px] text-[#555555] truncate group mt-3'>
                <Link to={path.home} className='group-hover:text-[#f16325] transtion duration-200 ease-in'>
                    {product.title}
                </Link>
            </div>
            <div className='flex items-center mt-[6px] w-full'>
                <div className='flex items-center gap-3'>
                    <p className='text-[13px] line-through text-[#acacac]'>{formatCurrency(product.price)}</p>
                    <p className='text-[#f16325] text-[16px] font-semibold'>{formatCurrency(product.price_discount)}</p>
                </div>
                <div className='text-[14px] ml-auto text-[#f16325] border-[1px] border-[#f16325] flex items-center justify-center w-[26px] h-[20px] cursor-pointer'>
                    <FontAwesomeIcon icon={faBagShopping} />
                </div>
            </div>
            <div className=''>
                <p className='text-[13px] text-[#333333] mt-[1px]'>{`Đã bán ${product.sold}`}</p>
            </div>
        </div>
    )
}
