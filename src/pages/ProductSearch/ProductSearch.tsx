import { useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import productApi from '~/apis/product.api'

import BreadCrumb from '~/components/BreadCrumb'
import Help from '~/components/Help'
import Policy from '~/components/Policy'
import Product from '~/components/Product'
import { breadCrumb } from '~/constants/breadCrumb'
import { AppContext } from '~/contexts/createContext'

export default function ProductSearch() {
    const { searchProduct } = useContext(AppContext)

    const { data: productListData } = useQuery({
        queryKey: ['product'],
        queryFn: () => productApi.getProductList()
    })

    const productsData = productListData?.data

    const productsToSearch = useMemo(
        () =>
            productsData?.filter(
                (product) => product.title.slice(0, 2).toUpperCase() === searchProduct.slice(0, 2).toUpperCase()
            ),
        [productsData, searchProduct]
    )

    return (
        <div>
            <BreadCrumb title={breadCrumb.productSearch.title} />
            <div className='max-w-[1142px] mx-auto'>
                {productsToSearch?.length === 0 && (
                    <h1 className='mt-7 text-[#555555] text-[20px]'>
                        Không tìm thấy bất kỳ kết quả nào với từ khóa trên.
                    </h1>
                )}

                {productsToSearch && productsToSearch?.length > 0 && (
                    <h1 className='mt-7 text-[#555555] text-[20px]'>
                        Có {productsToSearch.length} kết quả tìm kiếm phù hợp
                    </h1>
                )}

                <div className='grid grid-cols-12 gap-[16px] mt-[20px]'>
                    {productsToSearch?.map((product) => (
                        <div className='col-span-3'>
                            <Product product={product} setHeightImg='h-[320px]' isFlexColumn />
                        </div>
                    ))}
                </div>
            </div>
            <div className={productsToSearch?.length === 0 ? 'mt-[352px]' : ''}>
                <Help />
                <Policy />
            </div>
        </div>
    )
}
