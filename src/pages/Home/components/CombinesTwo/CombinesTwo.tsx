import BookChildren from './components/BookChildren'
import HandBook from './components/HandBook'

export default function CombinesTwo() {
    return (
        <div className='mt-5'>
            <div className='max-w-[1142px] mx-auto'>
                <div className='grid grid-cols-12 gap-[30px]'>
                    <div className='col-span-6'>
                        <BookChildren />
                    </div>
                    <div className='col-span-6'>
                        <HandBook />
                    </div>
                </div>
            </div>
        </div>
    )
}
