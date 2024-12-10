export interface CartType {
    id: string
    title: string
    imageUrl: string
    price: number
    totalPrice: number
    count: number
    stock: number
}

export interface ExtendedCart extends CartType {
    checked: boolean
}
