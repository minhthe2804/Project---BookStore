import { createContext } from 'react'
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

export const initialAppContext: AppContextInterface = {
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
