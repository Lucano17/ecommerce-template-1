"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderisPaid = async()=> {
    const session = await auth()

    if (!session?.user) {
        return {
            ok: false,
            message: "Debes de estar autenticado"
        }
    }

    const order = await prisma.order.findMany({
        where: {
            userId: session.user.id
        }
    })

    const orderIsPaid = order.map(o => o.isPaid);

    return {
        ok: true,
        orderIsPaid: orderIsPaid,
    }
}