import Banner from './components/Banner'
import BestSelling from './components/BestSelling'
import Comic from './components/Comic'
import MiniBanner from './components/MiniBanner'

export default function Home() {
    return (
        <div>
            <Banner />
            <BestSelling />
            <Comic />
            <MiniBanner />
        </div>
    )
}
