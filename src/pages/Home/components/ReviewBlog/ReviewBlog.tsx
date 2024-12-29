import Evaluate from "./components/Evaluate"
import News from "./components/News"


const ReviewBlog = () => {
  return (
    <div className='mt-5'>
                <div className='max-w-[1142px] mx-auto border-b-2 pb-10'>
                    <div className='grid grid-cols-12 gap-[30px]'>
                        <div className='col-span-4'>
                            <Evaluate />
                        </div>
                        <div className='col-span-8'>
                            <News />
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default ReviewBlog