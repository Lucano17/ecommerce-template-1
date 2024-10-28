"use server"

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";


interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
}

const taxIVARest = 0.21
const taxIVA = 1.21

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
    try {
        const session = await auth()
        const userId = session?.user.id
        if (!userId) {
            return {
                ok: false,
                message: "No hay sesión de usuario"
            }
        }

        const products = await prisma.product.findMany({
            where: {
              id: {
                in: productIds.map((p) => p.productId),
              },
            },
          });

        console.log("products:", products)

        // Colocar los montos
        const itemsInOrder = productIds.reduce((count, p)=> count + p.quantity, 0)

        // Colocar los totales de tax, subtotal y total
        const {subtotal, tax, total} = productIds.reduce((totals, item) => {
            const productQuantity = item.quantity;
            const product = products.find(product => product.id === item.productId)

            if (!product) throw new Error(`${item.productId} no existe - 500`)

                const subtotal = product.price * productQuantity

                totals.subtotal += subtotal
                totals.tax += subtotal * taxIVARest
                totals.total += subtotal * taxIVA

                return totals
        }, {subtotal: 0, tax:0, total:0})
        
        console.log({subtotal, tax, total})

    } catch (error) {
        return {
            ok: false,
            message: "Somthing went wrong"
        }
    }
}