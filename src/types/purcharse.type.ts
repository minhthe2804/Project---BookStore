import { CartType } from './cart.type'

export interface PurcharseType {
    id: string
    username: string
    address: string
    phone: string
    date: string
    time: string
    order: string
    product: CartType[]
    totalProduct: number
}
