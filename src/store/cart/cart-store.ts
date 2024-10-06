import type { CartProduct } from "@/interfaces"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
    cart: CartProduct[]
    addProductToCart: (product: CartProduct) => void

    getTotalItems: () => number

    updateProductQuantity: (product: CartProduct, quantity: number) => void

    removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            //Methods



            addProductToCart: (product: CartProduct) => {
                const { cart } = get()

                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )
                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return
                }
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item;
                })

                set({ cart: updatedCartProducts })
            },

            getTotalItems: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get()

                const updatedCartProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item
                })

                set({ cart: updatedCartProducts });
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get()
                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.size !== product.size
                );

                set({cart: updatedCartProducts})
            },


        })
        , {
            name: "shopping-cart"
        }
    )
)