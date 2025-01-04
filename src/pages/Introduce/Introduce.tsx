import Help from '~/components/Help'
import Policy from '~/components/Policy'

export default function Introduce() {
    return (
        <div>
            <div className='max-w-[1142px] mx-auto'>
                <h1 className='mt-[18px] text-[18px] text-[#323c3f]'>Giới thiệu</h1>
                <p className='text-[#555555] text-[14px] mt-[35px]'>
                    Vựa sách cũ là nguồn sách cũ bán buôn, bán lẻ hàng đầu tại Việt Nam hiện nay, đáp ứng đầy đủ nhu cầu
                    của khách hàng như: Decor tủ sách, sách cũ Online, nguồn hàng bán sỉ - lẻ, đa dạng đầu sách đọc, xây
                    dựng tủ sách thư viện - cộng đồng ....
                </p>
                <p className='text-[14px] font-semibold text-[#555555] mt-4'>
                    Địa chỉ:
                    <span className='font-normal ml-1'>
                        Số 2 Ngõ 42 Đường Thanh Bình, Phường Mộ Lao, Quận Hà Đông, Hà Nội, Việt Nam
                    </span>
                </p>
                <p className='text-[14px] font-semibold text-[#555555] mt-4'>
                    Điện thoại:
                    <span className='font-normal ml-1'>0828.899.333 </span>
                </p>
                <p className='text-[14px] font-semibold text-[#555555] mt-4'>
                    Email:
                    <span className='font-normal ml-1'>vuasachcuonline@gmail.com</span>
                </p>
                <div className='text-[14px] font-semibold text-[#555555] mt-4'>
                    Website:
                    <a
                        className='font-normal ml-1 cursor-pointer text-[#337ab7] hover:text-[#f16325] hover:underline'
                        href='https://vuasachcu.com/'
                    >
                        https://vuasachcu.com/
                    </a>
                </div>
            </div>
            <div className='mt-[220px]'>
                <Help />
                <Policy />
            </div>
        </div>
    )
}
