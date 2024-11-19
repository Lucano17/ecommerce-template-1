"use server"

import prisma from "@/lib/prisma";

export const updateOrderStatus = async (
  orderId: string,
  transactionId: string,
  paymentStatus?: string,
  paidAt?: Date | null
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: paymentStatus,
        // status_detailed: status_detailed,
        // transactionId: id,
        // paidAt: date_approved,
        transactionId: String(transactionId),
        paidAt: paidAt,
        isPaid: paymentStatus === "approved",
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