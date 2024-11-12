import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from "@/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentStatus = body.data.status;
    const paymentId = body.data.id;
    const orderId = body.data.external_reference; // Usa `external_reference` para identificar la orden en tu sistema

    // Actualiza el estado de la orden en tu base de datos
    await updateOrderStatus(orderId, paymentStatus);

    return NextResponse.json({ message: "Webhook received and processed" });
  } catch (error) {
    console.error("Error in Mercado Pago webhook:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}
