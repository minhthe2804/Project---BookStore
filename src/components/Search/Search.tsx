import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { path } from '~/constants/path'
import { AppContext } from '~/contexts/createContext'
import { schema, Schema } from '~/utils/rules'
import Button from '~/components/Button'

type FormData = Pick<Schema, 'search'>
const nameSchema = schema.pick(['search'])
export default function Search() {
    const { searchProduct, setSearchProduct } = useContext(AppContext)
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            search: ''
        },
        resolver: yupResolver(nameSchema)
    })

    const navigate = useNavigate()

    const onSubmitSearch = handleSubmit((data) => {
        const { search } = data
        setSearchProduct(search)
        navigate(path.productSearch)
    })

    const handleResetSearch = () => {
        setSearchProduct('')
        reset()
    }

    const gotoPageProductSearch = () => {
        navigate(path.productSearch)
    }

    return (
        <div>
            <form className='relative' onSubmit={onSubmitSearch}>
                <div className='flex items-center pr-[5px] pl-3 bg-white w-full border-[1px] border-[#e5e6ec]'>
                    <input
                        type='text'
                        className='w-full outline-none py-2 placeholder:text-[13px] text-black '
                        placeholder='Tìm kiếm...'
                        {...register('search')}
                    />
                    <Button className='w-[75px] bg-[#f16325] py-[9px] text-center text-white cursor-pointer'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={gotoPageProductSearch}/>
                    </Button>
                    {searchProduct && (
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className='text-[#c3c6d1] text-[18px] absolute right-[80px] cursor-pointer hover:text-[#ff3237] transtion duration-200 ease-in'
                            onClick={handleResetSearch}
                        />
                    )}
                </div>
            </form>
        </div>
    )
}
