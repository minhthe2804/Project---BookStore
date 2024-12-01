import { useRoutes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout/MainLayout'

import { path } from './constants/path'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import News from './pages/News'
import Introduce from './pages/Introduce'

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: path.home,
            index: true,
            element: (
                <MainLayout>
                    <Home />
                </MainLayout>
            )
        },
        {
            path: path.introduce,
            element: (
                <MainLayout>
                    <Introduce />
                </MainLayout>
            )
        },
        {
            path: path.collection,
            element: (
                <MainLayout>
                    <Collection />
                </MainLayout>
            )
        },
        {
            path: path.news,
            element: (
                <MainLayout>
                    <News />
                </MainLayout>
            )
        },
        {
            path: path.contact,
            element: (
                <MainLayout>
                    <Contact />
                </MainLayout>
            )
        }
    ])
    return routeElements
}
