import { faBook, faDollar } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { Product as ProductType } from '~/types/product.type'
import BreadCrumb from '~/components/BreadCrumb'
import Product from '~/components/Product'
import TitleModule from '~/components/TitleModule'
import { arrange, categories, pagination, priceRanges } from '~/constants/asideFilter'
import { breadCrumb } from '~/constants/breadCrumb'
import { useQuery } from '@tanstack/react-query'
import productApi from '~/apis/product.api'
import Help from '~/components/Help'
import Policy from '~/components/Policy'
import classNames from 'classnames'

const initialPage = [0, 12]
export default function Collection() {
    const [productData, setProductData] = useState<ProductType[]>([])
    const [pages, setPages] = useState<number[]>()
    const [active, setActive] = useState<number>(0)
    const [categoryProduct, setCategoryProduct] = useState<string>('')
    const [checkCategory, setCheckCategory] = useState<number | null>()
    const [checkPriceRange, setCheckPriceRange] = useState<number | null>()
    const [priceRange, setPriceRange] = useState<string>('')
    const [minPrice, setMinPrice] = useState<number | null>(null)
    const [maxPrice, setMaxPrice] = useState<number | null>(null)
    const [implement, setImplement] = useState<number>(490000)
    const [arrangePrice, setArrangePrice] = useState<string>(arrange[0])
    const [selectDefaultValue, setSelectDefaultValue] = useState<string>('')

    const { data: productListData } = useQuery({
        queryKey: ['product'],
        queryFn: () => productApi.getProductList()
    })

    useEffect(() => {
        if (productListData) {
            setProductData(productListData?.data)
        }
    }, [productListData])

    const handleCheckPriceRange = (
        index: number,
        priceMin: number,
        priceMax: number,
        enabled: boolean,
        priceRange: string
    ) => {
        if (productListData) {
            setCheckPriceRange(index)
            setMinPrice(priceMin)
            setMaxPrice(priceMax)
            setImplement(priceMax)
            setPages(pages)
            setPriceRange(priceRange)
            if (categoryProduct) {
                const filterTypeProducts = productListData.data.filter(
                    (product) => product.category === categoryProduct
                )
                const filteredProducts = filterTypeProducts.filter((product) =>
                    enabled
                        ? product.price_discount >= priceMin && product.price_discount <= priceMax
                        : product.price_discount > priceMax
                )
                setProductData(filteredProducts)
                return
            }
            const filteredProducts = productListData.data.filter((product) =>
                enabled
                    ? product.price_discount >= priceMin && product.price_discount <= priceMax
                    : product.price_discount > priceMax
            )
            setProductData(filteredProducts)
        }
    }

    const handleCheckCategory = (category: string) => {
        setCategoryProduct(category)
        setPages(pages)
        if (productListData) {
            const filterTypeProducts = productListData.data.filter((product) => product.category === category)
            if (priceRange) {
                const filteredProducts = filterTypeProducts.filter((product) =>
                    implement < 500000
                        ? product.price_discount >= Number(minPrice || 0) &&
                          product.price_discount <= Number(maxPrice || 500000)
                        : product.price_discount > Number(maxPrice || 500000)
                )
                setProductData(filteredProducts)
                return
            }
            const filteredProducts = filterTypeProducts.filter(
                (product) =>
                    product.price_discount >= Number(minPrice || 0) &&
                    product.price_discount <= Number(maxPrice || 600000)
            )
            setProductData(filteredProducts)
        }
    }

    const handleInputCheckCategory = (index: number, category: string) => {
        setCategoryProduct(category)
        setCheckCategory(index)
        setPages(pages)
        if (productListData) {
            const filterTypeProducts = productListData.data.filter((product) => product.category === category)
            if (priceRange) {
                const filteredProducts = filterTypeProducts.filter((product) =>
                    implement < 500000
                        ? product.price_discount >= Number(minPrice || 0) &&
                          product.price_discount <= Number(maxPrice || 500000)
                        : product.price_discount > Number(maxPrice || 500000)
                )
                setProductData(filteredProducts)
                setCheckCategory(index)
                return
            }
            const filteredProducts = filterTypeProducts.filter(
                (product) =>
                    product.price_discount >= Number(minPrice || 0) &&
                    product.price_discount <= Number(maxPrice || 600000)
            )
            setProductData(filteredProducts)
            setCheckCategory(index)
        }
    }

    const handleReset = () => {
        if (productListData) {
            setCategoryProduct('')
            setPriceRange('')
            setArrangePrice(arrange[0])
            setSelectDefaultValue('')
            setCheckCategory(null)
            setCheckPriceRange(null)
            setMinPrice(null)
            setMaxPrice(null)
            setImplement(490000)
            setPages([0, 12])
            setActive(0)
            setProductData(productListData?.data.slice(0, 12))
        }
    }

    const handlePage = (page: number[], index: number) => {
        if (productListData) {
            setActive(index)
            if (selectDefaultValue) {
                if (categoryProduct) {
                    const filterTypeProducts = productListData.data.filter(
                        (product) => product.category === categoryProduct
                    )
                    const filteredProducts = filterTypeProducts.filter((product) =>
                        implement < 500000
                            ? product.price_discount >= Number(minPrice || 0) &&
                              product.price_discount <= Number(maxPrice || 500000)
                            : product.price_discount >= Number(maxPrice || 500000)
                    )
                    const sortedProducts = filteredProducts.sort((a, b) =>
                        arrangePrice === arrange[0]
                            ? a.price_discount - b.price_discount
                            : b.price_discount - a.price_discount
                    )
                    setProductData(sortedProducts)
                    setPages(page)
                    return
                }
                const filteredProducts = productListData.data.filter((product) =>
                    implement < 500000
                        ? product.price_discount >= Number(minPrice || 0) &&
                          product.price_discount <= Number(maxPrice || 500000)
                        : product.price_discount >= Number(maxPrice || 500000)
                )
                const sortedProducts = filteredProducts.sort((a, b) =>
                    arrangePrice === arrange[0]
                        ? a.price_discount - b.price_discount
                        : b.price_discount - a.price_discount
                )
                setProductData(sortedProducts)
                setPages(page)
                return
            }
            if (categoryProduct) {
                const filterTypeProducts = productListData.data.filter(
                    (product) => product.category === categoryProduct
                )
                const filteredProducts = filterTypeProducts.filter((product) =>
                    implement < 500000
                        ? product.price_discount >= Number(minPrice || 0) &&
                          product.price_discount <= Number(maxPrice || 500000)
                        : product.price_discount > Number(maxPrice || 500000)
                )
                setProductData(filteredProducts)
                setPages(page)
                return
            }
            const filteredProducts = productListData.data.filter((product) =>
                implement < 500000
                    ? product.price_discount >= Number(minPrice || 0) &&
                      product.price_discount <= Number(maxPrice || 600000)
                    : product.price_discount > Number(maxPrice || 500000)
            )
            setProductData(filteredProducts)
            setPages(page)
            return
        }
    }

    const handleArrangePrice = (value: string) => {
        setArrangePrice(value === arrange[0] ? arrange[0] : arrange[1])
        setSelectDefaultValue(value === arrange[0] ? arrange[0] : arrange[1])
        if (productListData) {
            if (value === arrange[0]) {
                if (categoryProduct) {
                    const filterTypeProducts = productListData.data.filter(
                        (product) => product.category === categoryProduct
                    )
                    const filteredProducts = filterTypeProducts.filter((product) =>
                        implement < 500000
                            ? product.price_discount >= Number(minPrice || 0) &&
                              product.price_discount <= Number(maxPrice || 500000)
                            : product.price_discount >= Number(maxPrice || 500000)
                    )
                    const sortedProducts = filteredProducts.sort((a, b) => {
                        return a.price_discount - b.price_discount
                    })
                    setProductData(sortedProducts)
                    return
                }
                const filteredProducts = productListData.data.filter((product) =>
                    implement < 500000
                        ? product.price_discount >= Number(minPrice || 0) &&
                          product.price_discount <= Number(maxPrice || 500000)
                        : product.price_discount >= Number(maxPrice || 500000)
                )
                const sortedProducts = filteredProducts.sort((a, b) => {
                    return a.price_discount - b.price_discount
                })
                setProductData(sortedProducts)
                return
            }
            if (categoryProduct) {
                const filterTypeProducts = productListData.data.filter(
                    (product) => product.category === categoryProduct
                )
                const filteredProducts = filterTypeProducts.filter((product) =>
                    implement < 500000
                        ? product.price_discount >= Number(minPrice || 0) &&
                          product.price_discount <= Number(maxPrice || 500000)
                        : product.price_discount >= Number(maxPrice || 500000)
                )
                const sortedProducts = filteredProducts.sort((a, b) => b.price_discount - a.price_discount)
                setProductData(sortedProducts)
                return
            }
            const filteredProducts = productListData.data.filter((product) =>
                implement < 500000
                    ? product.price_discount >= Number(minPrice || 0) &&
                      product.price_discount <= Number(maxPrice || 500000)
                    : product.price_discount >= Number(maxPrice || 500000)
            )
            const sortedProducts = filteredProducts.sort((a, b) => b.price_discount - a.price_discount)
            setProductData(sortedProducts)
        }
    }

    return (
        <div>
            <BreadCrumb title={breadCrumb.collection.title} />
            <div className='max-w-[1142px] mx-auto'>
                <h1
                    className='text-[14px] text-[#555555] font-semibold mt-4 uppercase cursor-pointer'
                    onClick={handleReset}
                >
                    Tất cả danh mục
                </h1>
                <div className='flex gap-x-[100px] gap-y-3 flex-wrap items-center mt-5 '>
                    {categories.map((category, index) => (
                        <div
                            className={classNames(
                                'text-[14px] text-[#555555] cursor-pointer hover:text-[#f16325] transtion duration-200 ease-in',
                                {
                                    'text-[#f16325]': category === categoryProduct,
                                    'text-[#555555]': category !== categoryProduct
                                }
                            )}
                            key={index}
                            onClick={() => handleCheckCategory(category)}
                        >
                            <p>{category}</p>
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-12 gap-[33px] mt-5'>
                    <div className='col-span-3'>
                        <div>
                            <TitleModule icon={faDollar} width='w-[95px]' heading='Mức giá' />
                            {priceRanges.map((priceRange, index) => (
                                <div
                                    className='flex items-center py-2 pl-4 border-l-[1px] border-r-[1px] border-b-[1px] border-[#ebebeb]'
                                    key={index}
                                >
                                    <div className='text-[14.5px] flex items-center gap-3'>
                                        <input
                                            type='checkbox'
                                            className='h-4 w-4 accent-[#f35539] border border-[#ebebeb]'
                                            checked={checkPriceRange === index}
                                            onChange={() =>
                                                handleCheckPriceRange(
                                                    index,
                                                    priceRange.priceMin,
                                                    priceRange.priceMax,
                                                    priceRange.enabled,
                                                    priceRange.title
                                                )
                                            }
                                        />
                                        <p className='text-[14px] text-[#898989]'>{priceRange.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-6'>
                            <TitleModule icon={faBook} width='w-[158px]' heading='Loại sản phẩm' />
                            {categories.map((category, index) => (
                                <div
                                    className='flex items-center py-2 pl-4 border-l-[1px] border-r-[1px] border-b-[1px] border-[#ebebeb]'
                                    key={index}
                                >
                                    <div className='text-[14.5px] flex items-center gap-3'>
                                        <input
                                            type='checkbox'
                                            className='h-4 w-4 accent-[#f35539] border border-[#ebebeb]'
                                            checked={checkCategory === index}
                                            onChange={() => handleInputCheckCategory(index, category)}
                                        />
                                        <p className='text-[14px] text-[#898989]'>{category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='col-span-9'>
                        <div className='flex items-center gap-3'>
                            <p className='text-[14px] text-[#555555]'>Sắp xếp:</p>
                            <div className='relative'>
                                <select
                                    className='w-[182px] appearance-none py-[1px] outline-none border border-[#ebebeb] rounded-[4px] text-[14px] px-3 text-[#555555] cursor-pointer'
                                    value={selectDefaultValue || ''}
                                    onChange={(event) => handleArrangePrice(event.target.value)}
                                >
                                    <option value='' disabled>
                                        Mặc định
                                    </option>
                                    <option value={'asc'}>Giá từ thấp đến cao</option>
                                    <option value={'desc'}>Giá từ cao đến thấp</option>
                                </select>
                                <div className='absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-[15px] h-[15px] text-[#a1a4b1]'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M19 9l-7 7-7-7'
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-12 gap-4 mt-7'>
                            {productData.slice(...(pages || initialPage)).map((product) => (
                                <div className='col-span-3' key={product.id}>
                                    <Product product={product} isFlexColumn />
                                </div>
                            ))}
                        </div>

                        <div className='w-full flex items-center justify-center border border-[#ebebeb] rounded-[4px] py-[10px] px-[11px] mt-[30px]'>
                            <div className='w-full flex items-center justify-center gap-3'>
                                {pagination.map((page, index) => (
                                    <div
                                        className={classNames(
                                            'w-[30px] h-[30px] flex items-center justify-center border hover:border-[#f16325] hover:text-[#f16325] transition duration-200 ease-in cursor-pointer text-[14px]',
                                            {
                                                'border-[#f16325] text-[#f16325]': active === index,
                                                'border-[#ebebeb] text-[#555555]': active !== index
                                            }
                                        )}
                                        key={index}
                                        onClick={() => handlePage(page.pageArray as number[], index)}
                                    >
                                        {page.pageNumber}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[67px]'>
                <Help />
                <Policy />
            </div>
        </div>
    )
}
