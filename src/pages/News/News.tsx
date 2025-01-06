import { faBars, faCaretDown, faClock, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Help from '~/components/Help'
import Policy from '~/components/Policy'

import TitleModule from '~/components/TitleModule'
import { newCategories, news } from '~/constants/news'
import { titleModule } from '~/constants/titleModule'

export default function News() {
    return (
        <div>
            <div className='max-w-[1142px] mx-auto'>
                <div className='grid grid-cols-12 gap-[31px] mt-[27px]'>
                    <div className='col-span-3'>
                        <TitleModule icon={faNewspaper} heading={titleModule.pageNew.heading} width='w-[170px]' />

                        {news.slice(0, 4).map((newchild) => (
                            <div className='mt-[10px] flex gap-4 border-b border-[#ebebeb] pb-3' key={newchild.id}>
                                <img src={newchild.imageUrl} alt='' className='w-[90px] h-[90px] object-cover' />
                                <div>
                                    <p className='text-[14px] text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'>
                                        {newchild.title}
                                    </p>
                                    <div className='flex items-center mt-[7px] gap-[8px]'>
                                        <FontAwesomeIcon icon={faClock} className='text-[14px] text-[#f16325]' />
                                        <p className='text-[13px] text-[#acacac] mt-[2px]'>{newchild.published_at}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='mt-10'>
                            <TitleModule icon={faBars} heading='Danh mục tin tức' width='w-[190px]' />
                        </div>

                        {newCategories.map((category) => (
                            <div
                                className='border-l border-r border-b border-[#ebebeb] px-[14px] py-2 flex items-center gap-2 group'
                                key={category.id}
                            >
                                <div className='w-[6px] h-[6px] bg-[#f16325]'></div>
                                <div className='text-[14px] text-[#898989] cursor-pointer group-hover:text-[#f16325] transtion duration-200 ease-in'>
                                    {category.title}
                                </div>
                                {category.show_icon && (
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                        className='text-[#555555] text-[13px] cursor-pointer ml-auto group-hover:text-[#f16325] transtion duration-200 ease-in'
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='col-span-9'>
                        <h1 className='text-[15px] text-[#323c3f] uppercase font-semibold mt-2'>Tin tức</h1>
                        <div className='w-full h-[1px] bg-[#f16325] mt-4'></div>

                        {news.map((newdata) => (
                            <div className='mt-5 flex gap-4'>
                                <img src={newdata.imageUrl} alt='' className='w-[212px] object-cover' />
                                <div>
                                    <p className='text-[14px] font-semibold text-[#555555] hover:text-[#f16325] transtion duration-200 ease-in cursor-pointer'>
                                        {newdata.title}
                                    </p>
                                    <div className='flex items-center mt-[12px] gap-[8px]'>
                                        <FontAwesomeIcon icon={faClock} className='text-[14px] text-[#f16325]' />
                                        <p className='text-[13px] text-[#acacac] mt-[2px]'>{newdata.published_at}</p>
                                    </div>
                                    <p className='text-[13px] text-[#acacac] mt-6'>{newdata.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          <div className='mt-[100px]'>
                <Help />
                <Policy />
          </div>
        </div>
    )
}
