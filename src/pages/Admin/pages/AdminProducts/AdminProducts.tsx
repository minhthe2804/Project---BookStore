import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AdminProducts() {
    return (
        <div>
            <div className='px-4'>
                <div className='shadow-md bg-white rounded-md py-2 mt-2 border-l-[6px] border-l-[#f3f56d]'>
                    <div className='flex items-center justify-between text-[14px] font-semibold'>
                        <p className=' ml-6'>Danh sách sản phẩm</p>
                        <p className='mr-4'>Thời gian, 3/3/2025 - 11 giờ 08 phút 28 giây</p>
                    </div>
                </div>
                <div className='shadow-md bg-white border border-[#ececec] mt-4 rounded-[4px] px-3 pb-5'>
                    <div className='w-[160px] flex justify-center items-center py-2 bg-[#61f06d] mt-4 rounded-[3px] gap-1 cursor-pointer hover:bg-[#3cdd52] transition duration-200 ease-in'>
                        <FontAwesomeIcon icon={faPlus} className='text-[12px]' />
                        <p className='text-[12px] mt-[1px] font-[550]'>Tạo mới sản phẩm</p>
                    </div>
                    <div className='w-full h-[1px] bg-[#ececec] mt-4'></div>
                    <div className='flex items-center'>
                        <div className='flex text-[13px]'>
                            <p className=''>Hiện</p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
