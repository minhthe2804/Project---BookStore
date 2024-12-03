import { useEffect, useRef, useState } from 'react'
import 'animate.css'
import classNames from 'classnames/bind'

import { banner } from '~/constants/banner'
import styles from './Banner.module.css'

const cx = classNames.bind(styles)
export default function Banner() {
    const [index, setIndex] = useState<number>(0)
    const [animationClass, setAnimationClass] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        startAutoSlide()

        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const goToNextSlide = () => {
        if (isLoading) return
        setIsLoading(true)
        setAnimationClass('')
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex === banner.length - 1 ? 0 : prevIndex + 1))
            setAnimationClass('animate__fadeInRight')
            setIsLoading(false)
        }, 300)
    }

    const gotoPrevSlide = () => {
        if (isLoading) return
        setIsLoading(true)
        setAnimationClass('')
        setTimeout(() => {
            setIndex((prevIndex) => (prevIndex === 0 ? banner.length - 1 : prevIndex - 1))
            setAnimationClass('animate__fadeInLeft')
            setIsLoading(false)
        }, 300)
    }

    const startAutoSlide = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current)
        }

        const id = setInterval(() => {
            goToNextSlide()
        }, 8000)

        intervalIdRef.current = id
    }

    const handleSlideChange = (number: number) => {
        if (isLoading) return
        setIsLoading(true)
        setAnimationClass('')
        setTimeout(() => {
            setIndex(number)
            setAnimationClass(number > index ? 'animate__fadeInRight' : 'animate__fadeInLeft')
            setIsLoading(false)
        }, 300)
    }

    return (
        <div className='max-w-[1142px] mx-auto'>
            <div
                className={cx('relative w-full h-[590px]', {
                    'banner-slide': true
                })}
            >
                <img
                    src={banner[index]}
                    alt=''
                    className={`animate__animated ${animationClass} transition duration-200 w-full h-full object-cover`}
                />
                <button
                    className={cx(
                        'w-[50px] h-[50px] rounded-full bg-[#3159a64d] text-center absolute top-[50%] hover:bg-[#ff3237] hover:shadow-[0_0_20px_10px_rgba(255,50,55,0.3)] transition duration-200 ease-in',
                        {
                            'btn-banner-left': true
                        }
                    )}
                    onClick={gotoPrevSlide}
                >
                    <svg
                        className='svg-inline--fa fa-angle-left fa-w-8 text-[25px]'
                        aria-hidden='true'
                        data-prefix='fa'
                        data-icon='angle-left'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 256 512'
                        data-fa-i2svg=''
                    >
                        <path
                            fill='currentColor'
                            d='M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z'
                        ></path>
                    </svg>
                </button>
                <button
                    className={cx(
                        'w-[50px] h-[50px] rounded-full bg-[#3159a64d] text-center absolute top-[50%] hover:bg-[#ff3237] hover:shadow-[0_0_20px_10px_rgba(255,50,55,0.3)] transition duration-200 ease-in',
                        {
                            'btn-banner-right': true
                        }
                    )}
                    onClick={goToNextSlide}
                >
                    <svg
                        className='svg-inline--fa fa-angle-right fa-w-8 text-[25px]'
                        aria-hidden='true'
                        data-prefix='fa'
                        data-icon='angle-right'
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 256 512'
                        data-fa-i2svg=''
                    >
                        <path
                            fill='currentColor'
                            d='M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z'
                        ></path>
                    </svg>
                </button>
                <div className='relative'>
                    <div className='flex items-center gap-6 absolute left-[50%] transform -translate-x-[50%] top-[-42px]'>
                        {[0, 0, 0, 0].map((_, number) => {
                            const isActive = index === number
                            return (
                                <div
                                    className={cx(
                                        'w-[16px] h-[16px] border hover:border-[#ff3237] transition duration-300 rotate-45 relative group cursor-pointer',
                                        {
                                            'border border-[#ff3237]': isActive,
                                            'border-transparent border-[#ff3237]': !isActive
                                        }
                                    )}
                                    key={number}
                                    onClick={() => handleSlideChange(number)}
                                >
                                    <div
                                        className={cx(
                                            'w-[8px] h-[8px] group-hover:bg-[#ff3237] transition duration-300 ease-in absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2',
                                            {
                                                'bg-[#ff3237]': isActive,
                                                'bg-white': !isActive
                                            }
                                        )}
                                    ></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
