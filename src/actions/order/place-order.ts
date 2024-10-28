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

    // Calcular los montos
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)

    // Colocar los totales de tax, subtotal y total
    const { subTotal: subtotal, tax, total } = productIds.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find((product) => product.id === item.productId)

        if (!product) throw new Error(`${item.productId} no existe - 500`)

        const subTotal = product.price * productQuantity

        totals.subTotal += subTotal
        totals.tax += subTotal * taxIVARest
        totals.total += subTotal * taxIVA

        return totals
    }, { subTotal: 0, tax: 0, total: 0 })

    console.log({ subTotal: subtotal, tax, total })
    try {

        // Crear transacción en la base de datos

        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Actualizar el stock de los productos




            // 2. Crear la orden - Encabezado - Detalles
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subtotal: subtotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map((p) => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find((product) => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            })





            // 3. Crear la dirección de la orden


            return {
                order: order,
                updatedProducts: [],
                orderAddress: {}
            }
        })

    } catch (error) {
        return {
            ok: false,
            message: "Somthing went wrong"
        }
    }
}