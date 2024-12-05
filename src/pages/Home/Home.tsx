import Banner from './components/Banner'
import BestSelling from './components/BestSelling'
import Comic from './components/BookComic'
import BookLiterary from './components/BookLiterary'
import MiniBanner from './components/MiniBanner'

export default function Home() {
    return (
        <div>
            <Banner />
            <BestSelling />
            <Comic />
            <MiniBanner />
            <BookLiterary />
        </div>
    )
}
