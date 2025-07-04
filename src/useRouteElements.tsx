/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useContext } from 'react'

import MainLayout from './Layouts/MainLayout'
import { path } from './constants/path'
import { AppContext } from './contexts/createContext'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import Introduce from './pages/Introduce'
import Contact from './pages/Contact'
import Address from './pages/Checkout/pages/Address'
import Payment from './pages/Checkout/pages/Payment'
import ThankYou from './pages/Checkout/pages/ThankYou'
import Collection from './pages/Collection'
import AccountOder from './pages/Account/pages/AccountOder'
import ChangePassword from './pages/Account/pages/ChangePassword'
import UpdateProfile from './pages/Account/pages/UpdateProfile'
import ProductSearch from './pages/ProductSearch'
import News from './pages/News'
import Admin from './pages/Admin'
import AdminLayout from './Layouts/AdminLayout/AdminLayout'
import AdminProducts from './pages/Admin/pages/AdminProducts'
import AdminOrders from './pages/Admin/pages/AdminOrders.tsx'
import AdminUsers from './pages/Admin/pages/AdminUsers'
import AdminReports from './pages/Admin/pages/AdminReports'

function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

function AdminRoute() {
    const { profile } = useContext(AppContext)
    return profile?.role === 'admin' ? <Outlet /> : <Navigate to={path.home} />
}

function UserRoute() {
    const { profile } = useContext(AppContext)
    return profile?.role === 'user' ? <Outlet /> : <Navigate to={path.home} />
}

function CheckoutRoute() {
    const { isCheckout, isPageCart } = useContext(AppContext)

    if (isCheckout) {
        return <Outlet />
    }
    if (isPageCart) {
        return <Navigate to={path.cart} />
    }
    return <Navigate to={path.home} />
}

function AddressRoute() {
    const { isAddress } = useContext(AppContext)
    return isAddress ? <Outlet /> : <Navigate to={path.checkoutAddress} />
}

function ThankyouRoute() {
    const { isThankyou } = useContext(AppContext)
    return isThankyou ? <Outlet /> : <Navigate to={path.checkoutPayment} />
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
            path: path.collection,
            element: (
                <MainLayout>
                    <Collection />
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
                    path: path.forgotPassword,
                    element: (
                        <MainLayout>
                            <ForgotPassword />
                        </MainLayout>
                    )
                }
            ]
        },
        {
            path: path.productDetail,
            element: (
                <MainLayout>
                    <ProductDetail />
                </MainLayout>
            )
        },
        {
            path: '',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '',
                    element: <AdminRoute />,
                    children: [
                        {
                            path: path.adminDashboard,
                            element: (
                                <AdminLayout>
                                    <Admin />
                                </AdminLayout>
                            ),
                            children: [
                                {
                                    path: path.adminProducts,
                                    element: <AdminProducts />
                                },
                                {
                                    path: path.adminOrders,
                                    element: <AdminOrders />
                                },
                                {
                                    path: path.adminUsers,
                                    element: <AdminUsers />
                                },
                                {
                                    path: path.adminReports,
                                    element: <AdminReports />
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '',
                    element: <UserRoute />,
                    children: [
                        {
                            path: path.cart,
                            element: (
                                <MainLayout>
                                    <Cart />
                                </MainLayout>
                            )
                        },
                        {
                            path: path.account,
                            element: (
                                <MainLayout>
                                    <Account />
                                </MainLayout>
                            ),
                            children: [
                                {
                                    path: path.accountOder,
                                    element: <AccountOder />
                                },
                                {
                                    path: path.changePassword,
                                    element: <ChangePassword />
                                },
                                {
                                    path: path.updateProfile,
                                    element: <UpdateProfile />
                                }
                            ]
                        },
                        {
                            path: '',
                            element: <CheckoutRoute />,
                            children: [
                                {
                                    path: path.checkout,
                                    element: <Checkout />,
                                    children: [
                                        {
                                            path: '',
                                            element: <Outlet />,
                                            children: [
                                                {
                                                    path: path.checkoutAddress,
                                                    element: <Address />
                                                },
                                                {
                                                    path: '',
                                                    element: <AddressRoute />,
                                                    children: [
                                                        {
                                                            path: path.checkoutPayment,
                                                            element: <Payment />
                                                        }
                                                    ]
                                                },
                                                {
                                                    path: '',
                                                    element: <ThankyouRoute />,
                                                    children: [
                                                        {
                                                            path: path.checkoutThankYou,
                                                            element: <ThankYou />
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
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
            path: path.contact,
            element: (
                <MainLayout>
                    <Contact />
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
            path: path.productSearch,
            element: (
                <MainLayout>
                    <ProductSearch />
                </MainLayout>
            )
        }
    ])
    return routeElements
}
