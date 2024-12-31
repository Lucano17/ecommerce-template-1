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

    // Calculate amounts
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)

    // Put taxes, subtotal & total
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

    try {

        // Crear transacción en la base de datos

        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. Actualizar el stock de los productos
            const updatedProductsPromises = products.map((product) => {

                // Acumular los valores
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0)

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`)
                }



                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
            })

            const updatedProducts = await Promise.all(updatedProductsPromises)

            // Verificar valores negativos en las existencias = no  hay stock
            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} no tiene inventario suficiente`)
                }
            });



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

            const { country, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: restAddress.firstName,
                    lastName: restAddress.lastName,
                    address: restAddress.address,
                    address2: restAddress.address2,
                    postalCode: restAddress.postalCode,
                    city: restAddress.city,
                    phone: restAddress.phone,
                    //...restAddress,     
                    orderId: order.id,
                    countryId: country,
                }
            })


            return {
                order: order,
                updatedProducts: updatedProducts,
                orderAddress: orderAddress,
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }
}