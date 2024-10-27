"use server"

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";


interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
}


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

        const itemsInOrder = productIds.reduce((count, p)=> count + p.quantity, 0)


    } catch (error) {
        return {
            ok: false,
            message: "Somthing went wrong"
        }
    }
}