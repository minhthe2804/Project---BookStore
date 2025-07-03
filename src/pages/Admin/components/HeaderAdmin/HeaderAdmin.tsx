import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";

import { cartApi } from "~/apis/cart.api";
import { checkoutApi } from "~/apis/checkout.api";
import { purcharseApi } from "~/apis/purcharse.api";
import { toastNotify } from "~/constants/toastNotify";
import { AppContext } from "~/contexts/createContext";
import { clearLS } from "~/utils/auth";


export default function HeaderAdmin() {
    const {setIsAuthenticated,setProfile,setIsCheckout,setIsAddress,setIsThankyou,setProductInThankyou} = useContext(AppContext)

    const { data: productInCartData, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.getCart()
    })

    const deleteCartMutation = useMutation({
        mutationFn: (id: string) => cartApi.deleteCart(id),
        onSuccess: () => {
            refetch()
        }
    })

    const { data: checkoutProductData, refetch: refresh } = useQuery({
        queryKey: ['checkout'],
        queryFn: () => checkoutApi.getCheckout()
    })

    const deleteProductToCheckoutMutation = useMutation({
        mutationFn: (id: string) => checkoutApi.deleteCheckout(id),
        onSuccess: () => {
            refresh()
        }
    })


    const { data: productInPurcharseData } = useQuery({
        queryKey: ['purcharse'],
        queryFn: () => purcharseApi.getPurcharse()
    })

    const deletePurcharseMutation = useMutation({
        mutationFn: (id: string) => purcharseApi.deleteProductInPurcharse(id)
    })

    const productToCart = productInCartData?.data
    const productCheckout = checkoutProductData?.data
    const productPurcharse = productInPurcharseData?.data

     const handleLogout = () => {
            clearLS()
            setIsAuthenticated(false)
            setProfile(null)
            setIsCheckout(false)
            setIsAddress(false)
            setIsThankyou(false)
            setProductInThankyou([])
            productToCart?.map((cart) => deleteCartMutation.mutate(cart.id))
            productCheckout?.map((checkout) => deleteProductToCheckoutMutation.mutate(checkout.id))
            productPurcharse?.map((purcharse) => deletePurcharseMutation.mutate(purcharse.id))
            toast.success(toastNotify.logOut.logOutSuccess, { autoClose: 2000 })
        }

    return (
        <div className='py-2 bg-[#f16325] flex justify-end'>
            <div className='w-10 py-2 border border-[#fff] flex justify-center items-center text-white mr-8 cursor-pointer hover:bg-slate-500 transition duration-300 ease-in' onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
        </div>
    )
}
