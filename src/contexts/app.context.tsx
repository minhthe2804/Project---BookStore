import { useState } from 'react'

import { AppContext, initialAppContext } from './createContext'
import { User } from '~/types/user.type'
import { ExtendedCart } from '~/types/cart.type'
import { PurcharseType } from '~/types/purcharse.type'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [isCheckout, setIsCheckout] = useState<boolean>(initialAppContext.isCheckout)
    const [isPageCart, setIsPageCart] = useState<boolean>(initialAppContext.isPageCart)
    const [isAddress, setIsAddress] = useState<boolean>(initialAppContext.isAddress)
    const [isThankyou, setIsThankyou] = useState<boolean>(initialAppContext.isThankyou)
    const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
    const [extendedCart, setExtendedCart] = useState<ExtendedCart[]>(initialAppContext.extendedCart)
    const [productInThankyou, setProductInThankyou] = useState<PurcharseType[]>(initialAppContext.productInThankyou)
    const reset = () => {
        setIsAuthenticated(false)
        setProfile(null)
        setIsCheckout(false)
    }

    const value = {
        isAuthenticated,
        setIsAuthenticated,
        isCheckout,
        setIsCheckout,
        isPageCart,
        setIsPageCart,
        isAddress,
        setIsAddress,
        isThankyou,
        setIsThankyou,
        profile,
        setProfile,
        extendedCart,
        setExtendedCart,
        productInThankyou,
        setProductInThankyou,
        reset
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
