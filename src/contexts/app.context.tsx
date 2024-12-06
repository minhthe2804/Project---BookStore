import { createContext, useState } from 'react'
import { ExtendedCart } from '~/types/cart.type'
import { PurcharseType } from '~/types/purcharse.type'
import { User } from '~/types/user.type'
import { getCheckoutFromLS, getLoginSuccess, getProfileFromLS } from '~/utils/auth'

interface AppContextInterface {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    isCheckout: boolean
    setIsCheckout: React.Dispatch<React.SetStateAction<boolean>>
    isAddress: boolean
    setIsAddress: React.Dispatch<React.SetStateAction<boolean>>
    isThankyou: boolean
    setIsThankyou: React.Dispatch<React.SetStateAction<boolean>>
    profile: User | null
    setProfile: React.Dispatch<React.SetStateAction<User | null>>
    extendedCart: ExtendedCart[]
    setExtendedCart: React.Dispatch<React.SetStateAction<ExtendedCart[]>>
    productInThankyou: PurcharseType[]
    setProductInThankyou: React.Dispatch<React.SetStateAction<PurcharseType[]>>
    reset: () => void
}

const initialAppContext: AppContextInterface = {
    isAuthenticated: Boolean(getLoginSuccess()),
    setIsAuthenticated: () => null,
    isCheckout: Boolean(getCheckoutFromLS()),
    setIsCheckout: () => null,
    isAddress: false,
    setIsAddress: () => null,
    isThankyou: false,
    setIsThankyou: () => null,
    profile: getProfileFromLS(),
    setProfile: () => null,
    extendedCart: [],
    setExtendedCart: () => null,
    productInThankyou: [],
    setProductInThankyou: () => null,
    reset: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
    const [isCheckout, setIsCheckout] = useState<boolean>(initialAppContext.isCheckout)
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
