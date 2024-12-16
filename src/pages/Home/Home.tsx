import Help from '~/components/Help'
import Banner from './components/Banner'
import BestSelling from './components/BestSelling'
import Comic from './components/BookComic'
import BookLiterary from './components/BookLiterary'
import CombinesTwo from './components/CombinesTwo'
import MiniBanner from './components/MiniBanner'
import Policy from '~/components/Policy'
import { useContext, useEffect } from 'react'
import { AppContext } from '~/contexts/createContext'

export default function Home() {
    const { setIsPageCart } = useContext(AppContext)

    useEffect(() => {
        setIsPageCart(false)
    })

    return (
        <div>
            <Banner />
            <BestSelling />
            <Comic />
            <MiniBanner />
            <BookLiterary />
            <CombinesTwo />

            <Help />
            <Policy />
        </div>
    )
}
