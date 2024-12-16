import { PurcharseType } from '~/types/purcharse.type'
import httpPurcharse from '~/utils/httpPurchase'

const URL = '/purcharse'
export const purcharseApi = {
    getPurcharse: () => httpPurcharse.get<PurcharseType[]>(URL),
    getProductToPurcharse: (id: string) => httpPurcharse.get<PurcharseType>(`${URL}/${id}`),
    buyProducts: (body: PurcharseType) => httpPurcharse.post<PurcharseType>(URL, body),
    deleteProductInPurcharse: (id: string) => httpPurcharse.delete<PurcharseType>(`${URL}/${id}`)
}
