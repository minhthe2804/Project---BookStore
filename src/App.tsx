import { useContext, useEffect } from 'react'
import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppContext } from './contexts/createContext'
import { localStorageEventTarget } from './utils/auth'

export default function App() {
    const routeElements = useRouteElements()

    const { reset } = useContext(AppContext)

    useEffect(() => {
        localStorageEventTarget.addEventListener('clearLS', reset)

        return () => {
            localStorageEventTarget.removeEventListener('clearLS', reset)
        }
    }, [reset])

    return (
        <div>
            {routeElements}
            <ToastContainer />
        </div>
    )
}
