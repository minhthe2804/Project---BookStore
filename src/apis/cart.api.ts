import { CartType } from '~/types/cart.type'
import httpCart from '~/utils/httpCart'

const URL = '/cart'
export const cartApi = {
    addToCart: (body: CartType) => httpCart.post<CartType>(URL, body),
    getCart: () => httpCart.get<CartType[]>(URL),
    updateCart: (id: string, body: CartType) => httpCart.put<CartType>(`${URL}/${id}`, body),
    deleteCart: (id: string) => httpCart.delete<CartType>(`${URL}/${id}`)
}
