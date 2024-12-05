export default function MiniBanner() {
    return (
        <div className='mt-3'>
            <div className='max-w-[1142px] mx-auto'>
                <div className='flex items-center gap-[30px]'>
                    <figure className='w-[556px] h-[120px]'>
                        <img
                            src='https://theme.hstatic.net/200000612501/1001045770/14/banner_large1.png?v=178'
                            alt=''
                            className='w-full h-full object-cover'
                        />
                    </figure>
                    <figure className='w-[556px] h-[120px]'>
                        <img
                            src='https://theme.hstatic.net/200000612501/1001045770/14/banner_large2.png?v=178'
                            alt=''
                            className='w-full h-full object-cover'
                        />
                    </figure>
                </div>
            </div>
        </div>
    )
}
