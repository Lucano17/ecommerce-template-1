// update-order-status.ts en actions/order/update-order-status.ts

import prisma from "@/lib/prisma"; // o el cliente de tu base de datos

export const updateOrderStatus = async (orderId: string, paymentStatus: string) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: paymentStatus },
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};
