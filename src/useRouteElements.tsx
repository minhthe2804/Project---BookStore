/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'

import MainLayout from './Layouts/MainLayout/MainLayout'
import { path } from './constants/path'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import News from './pages/News'
import Introduce from './pages/Introduce'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

import { AppContext } from './contexts/createContext'

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

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
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: path.register,
                    element: (
                        <MainLayout>
                            <Register />
                        </MainLayout>
                    )
                },
                {
                    path: path.login,
                    element: (
                        <MainLayout>
                            <Login />
                        </MainLayout>
                    )
                },
                {
                    path: path.contact,
                    element: (
                        <MainLayout>
                            <ForgotPassword />
                        </MainLayout>
                    )
                }
            ]
        }
    ])
    return routeElements
}
