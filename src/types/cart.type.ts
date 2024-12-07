export interface CartType {
    id: string
    previewImage: string
    title: string
    version: string
    price: number
    totalPrice: number
    count: number
    vendor: string
    quantity: number
}

export interface ExtendedCart extends CartType {
    checked: boolean
}
