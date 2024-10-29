import type { CartProduct } from "@/interfaces"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
    cart: CartProduct[]
    addProductToCart: (product: CartProduct) => void

    getTotalItems: () => number

    updateProductQuantity: (product: CartProduct, quantity: number) => void

    removeProduct: (product: CartProduct) => void

    getSummaryInformation: () => {
        subtotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    }

    clearCart: ()=> void
}


// 21% de IVA en el resumen de orden de compra
const taxIVA = 0.21;


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

                set({ cart: updatedCartProducts })
            },

            getSummaryInformation: () => {
                const { cart } = get();

                const subtotal = cart.reduce(
                    (subtotal, product) => (product.quantity * product.price) + subtotal
                    , 0)

                const tax = subtotal * taxIVA
                const total = subtotal + tax
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

                return {
                    subtotal: parseFloat(subtotal.toFixed(2)),
                    tax: parseFloat(tax.toFixed(2)),
                    total: parseFloat(total.toFixed(2)),
                    itemsInCart
                }
            },

            clearCart: ()=> {
                set({cart: []})
            },


        })
        , {
            name: "shopping-cart"
        }
    )
)