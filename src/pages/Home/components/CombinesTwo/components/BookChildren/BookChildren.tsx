import { faEye } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import productApi from '~/apis/product.api'
import Product from '~/components/Product'
import TitleModule from '~/components/TitleModule'

export default function BookChildren() {
    const { data: productListData, isFetching } = useQuery({
        queryKey: ['product'],
        queryFn: () => productApi.getProductList()
    })

    const productDataBookChildren = useMemo(
        () => productListData?.data.filter((product) => product.category === 'Sách Thiếu Nhi'),
        [productListData?.data]
    )

    return (
        <div>
            <TitleModule icon={faEye} width='w-[160px]' heading='SÁCH THIẾU NHI' />
            <figure className='w-[556px] h-[98px] justify-start'>
                <img
                    src='https://theme.hstatic.net/200000612501/1001045770/14/mevabe_banner.png?v=178'
                    alt=''
                    className='w-full h-full object-cover'
                />
            </figure>
            <div className='grid grid-cols-6 gap-2'>
                {productDataBookChildren &&
                    productDataBookChildren.map((product) => (
                        <div className='col-span-2' key={product.id}>
                            <Product product={product} isFlexColumn/>
                        </div>
                    ))}
            </div>
        </div>
    )
}
