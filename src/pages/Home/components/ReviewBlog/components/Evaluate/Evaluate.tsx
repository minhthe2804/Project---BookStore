/* eslint-disable react-hooks/exhaustive-deps */
import { faComment, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import TitleModule from '~/components/TitleModule'
import { sections } from '~/constants/section'

import { titleModule } from '~/constants/titleModule'

const Evaluate = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [sections.length])

    return (
        <div>
            <TitleModule icon={faComment} width='w-[160px]' heading={titleModule.evaluate.heading} />
            <div className='relative overflow-hidden w-full float-left border border-[#ebebeb] mt-4'>
                <div
                    className='flex transition-transform duration-[1000ms]'
                    style={{
                        transform: `translateX(-${currentIndex * (100 / sections.length)}%)`,
                        width: `${sections.length * 100}%`
                    }}
                >
                    {sections.map((section, id) => (
                        <div key={id} className='flex-shrink-0 flex flex-col items-center p-5 w-full sm:w-[33.333%]'>
                            <div className='w-[100px] h-[100px] rounded-full text-center my-[15px] mx-auto'>
                                <img
                                    className='max-w-full border-4 border-[#f16325] rounded-full'
                                    src={section.img}
                                    alt={section.title}
                                />
                            </div>
                            <h3 className='font-bold text-center'>{section.title}</h3>
                            <span className='text-center pb-4'>{section.role}</span>
                            <ul className='flex justify-center text-[#ffec3c] text-xs pb-4'>
                                <li>
                                    <FontAwesomeIcon icon={faStar} />
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faStar} />
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faStar} />
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faStar} />
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faStar} />
                                </li>
                            </ul>
                            <p className='text-sm text-justify text-[#555555]'>{section.description}</p>
                        </div>
                    ))}
                </div>


                <div className='flex justify-center mb-5'>
                    {sections.map((_, index) => (
                        <div
                            key={index}
                            className={`h-[10px] w-[10px] rounded-full mx-1 ${
                                currentIndex === index ? 'bg-[#f16325]' : 'bg-[#ddd]'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Evaluate
