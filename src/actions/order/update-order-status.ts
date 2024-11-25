"use server"

import prisma from "@/lib/prisma";

export const updateOrderStatus = async (
  transactionId: string,
  orderId?: string,
  paymentStatus?: string,
  paidAt?: Date | null
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId: String(transactionId),
        status: paymentStatus,
        paidAt: paidAt,
        isPaid: paymentStatus === "approved" || paymentStatus === "COMPLETED",
        // currency_id: currency_id
        // total_paid_amount: total_paid_amount
      },
    });
    

    return {ok: true}
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
  }
};