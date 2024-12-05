import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface Props {
    icon: IconDefinition
    width?: string
    heading?: string
    promotion?: string
}

export default function TitleModule({ icon, width, heading, promotion }: Props) {
    return (
        <div className='w-full bg-white border-[1px] border-[#ebebeb] h-[46px]'>
            <div className='flex items-center gap-10'>
                <div className='flex items-center relative'>
                    <div className='flex justify-center items-center bg-[#ff8641] w-[42px] h-[44px] '>
                        <FontAwesomeIcon icon={icon} className='text-white text-[20px]' />
                    </div>
                    <div
                        className={`flex uppercase justify-center items-center bg-[#ff640b] ${width} h-[44px] text-white text-[18px]`}
                    >
                        {heading}
                    </div>
                    <div className='absolute ml-2 border-[22px] border-l-[#ff640b] border-r-transparent border-t-transparent border-b-transparent right-[-44px]'></div>
                </div>
                <p className='flex justify-center items-center h-[44px] text-[#ff640b] text-[18px] font-semibold'>
                    {promotion}
                </p>
            </div>
        </div>
    )
}
