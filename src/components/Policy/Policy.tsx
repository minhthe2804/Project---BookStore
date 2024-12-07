import { faEarth, faHeadphones, faRotate,  faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Policy() {
    return (
        <div>
            <div className='max-w-[1142px] mx-auto'>
                <div className='grid grid-cols-12 '>
                    <div className='col-span-3 border-r-[1px] border-[#ebebeb]'>
                        <div className='w-full h-[84px] flex items-center justify-center gap-2 text-[#555555] text-[14px]'>
                            <FontAwesomeIcon icon={faEarth} className='text-[24px]' />
                            <p className=''>Giao hàng toàn quốc</p>
                        </div>
                    </div>
                    <div className='col-span-3 border-r-[1px] border-[#ebebeb]'>
                        <div className='w-full h-[84px] flex items-center justify-center gap-2 text-[#555555] text-[14px]'>
                            <FontAwesomeIcon icon={faShieldAlt} className='text-[24px]' />
                            <p className=''>Bảo mật thanh toán</p>
                        </div>
                    </div>
                    <div className='col-span-3 border-r-[1px] border-[#ebebeb]'>
                        <div className='w-full h-[84px] flex items-center justify-center gap-2 text-[#555555] text-[14px]'>
                            <FontAwesomeIcon icon={faRotate} className='text-[24px]' />
                            <p className=''>Đổi trả trong 7 ngày</p>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='w-full h-[84px] flex items-center justify-center gap-2 text-[#555555] text-[14px]'>
                            <FontAwesomeIcon icon={faHeadphones} className='text-[24px]' />
                            <p className=''>Tư vẫn miễn phí</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
