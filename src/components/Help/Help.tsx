import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Help() {
    return (
        <div className='mt-8'>
            <div className='bg-[#f16325] h-20 flex items-center justify-center text-white text-[14px] gap-2'>
                <div className='w-6 h-6 rounded-full bg-[#fbc531] flex items-center justify-center'>
                    <FontAwesomeIcon icon={faQuestion} className='text-[#f16325] text-[15px]' />
                </div>
                <p>Bạn cần hỗ trợ? Nhấc máy lên và gọi ngay cho chúng tôi -</p>
                <p>0828899333</p>
                <p>hoặc</p>
                <div className='flex items-center justify-center w-[135px] py-[6px] bg-[#0089ff]'>Hỗ trợ trực tuyến</div>
            </div>
        </div>
    )
}
