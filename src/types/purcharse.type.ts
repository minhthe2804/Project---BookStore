import { CartType } from './cart.type'

export interface PurcharseType extends CartType {
    username: string
    address: string
    phone: string
    date: string
    time: string
    order: string
}
