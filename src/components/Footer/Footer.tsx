import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false)

    useEffect(() => {
        // Load Facebook SDK
        const loadFacebookSDK = () => {
            if (!document.getElementById('facebook-jssdk')) {
                const script = document.createElement('script')
                script.id = 'facebook-jssdk'
                script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=631942543575730'
                document.body.appendChild(script)
            }
        }
        loadFacebookSDK()

        
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowBackToTop(true)
            } else {
                setShowBackToTop(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer id='footer' className='bg-[#f16325] text-white text-sm relative'>
            <div className='max-w-[1142px] mx-auto'>
                <div className='border-b pt-[15px] pb-[30px] flex'>
                    <div className='flex-1'>
                        <h4 className='uppercase font-bold pb-[30px]'>Chính sách chung</h4>
                        <ul>
                            <li className='leading-9'>
                                <a href=''>Chính sách bảo mật</a>
                            </li>
                            <li className='leading-9'>
                                <a href=''>Hình thức thanh toán</a>
                            </li>
                            <li className='leading-9'>
                                <a href=''>Chính sách đổi trả</a>
                            </li>
                            <li className='leading-9'>
                                <a href=''>Hình thức giao &amp; Nhận hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className='flex-[2]'>
                        <div className='flex justify-center items-center'>
                            <div
                                className='fb-page'
                                data-href='https://www.facebook.com/vuasachcuHanoi'
                                data-width='340'
                                data-height='220'
                                data-small-header='false'
                                data-adapt-container-width='true'
                                data-hide-cover='false'
                                data-show-facepile='true'
                            ></div>
                        </div>
                    </div>
                </div>

                <div className='py-[30px]'>
                    <h4 className='uppercase font-bold pb-[30px]'>Mua bán - Trao đổi sách giá rẻ</h4>
                    <p className='leading-7'>
                        Trụ sở chính: Số 87 Louis 2, Phường Đại Mỗ, Quận Nam Từ Liêm, Hà Nội, Vietnam
                    </p>
                    <p className='leading-7'>
                        Điện thoại:{' '}
                        <a className='hover:text-zinc-600' href='tel:0828899333'>
                            0828899333{' '}
                        </a>
                    </p>
                    <p className='leading-7'>
                        Email:{' '}
                        <a className='hover:text-zinc-600' href='mailto:vuasachcuonline@gmail.com'>
                            vuasachcuonline@gmail.com
                        </a>
                    </p>
                </div>
            </div>
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    id='back-to-top'
                    className='fixed bottom-4 right-4 p-3 bg-[#f16325] text-white rounded-md border-2 border-white shadow-lg hover:bg-[#d44e1f] hover:border-[#ffe4c3] transition-all duration-300 flex items-center justify-center'
                    title='Lên đầu trang'
                >
                    <FontAwesomeIcon className='text-xl' icon={faAngleUp} />
                </button>
            )}
        </footer>
    )
}
