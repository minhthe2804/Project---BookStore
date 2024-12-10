import { CartType } from '~/types/cart.type'
import httpCheckout from '~/utils/httpCheckout'

const URL = '/checkout'
export const checkoutApi = {
    getCheckout: () => httpCheckout.get<CartType[]>(URL),
    addCheckout: (body: CartType) => httpCheckout.post<CartType>(URL, body),
    updateProducttoCheckout: (id: string, body: CartType) => httpCheckout.put<CartType>(`${URL}/${id}`, body),
    deleteCheckout: (id: string) => httpCheckout.delete<CartType>(`${URL}/${id}`)
}
