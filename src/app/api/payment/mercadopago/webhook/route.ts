import { NextRequest, NextResponse } from 'next/server';
import { mercadopago, updateOrderStatus } from "@/actions";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('data.id');
    const topic = searchParams.get('type');

    if (!paymentId || !topic) {
      console.error("Faltan parámetros 'id' o 'topic' en la URL");
      return NextResponse.json({ error: "Faltan parámetros 'id' o 'topic' en la URL" }, { status: 400 });
    }

    if (topic === "payment") {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${mercadopago.accessToken}` }
      });

      if (!response.ok) {
        console.log("No se ha logrado conectar correctamente con el webhook de Mercado Pago");
        return NextResponse.json({ error: "Failed to connect to Mercado Pago" }, { status: 500 });
      }

      const data = await response.json();
      console.log("Payment data from Mercado Pago:", data);
      // Update to Database
      await updateOrderStatus(
        data.external_reference, // Refers to an orderId
        data.id, //transactionId
        data.status, //paymentStatus => isPaid
        data.date_approved ? new Date(data.date_approved) : null //paidAt
      );

      return NextResponse.json({ message: "Webhook received and processed" });
    }

    console.log(topic === "merchant_order" ? "Notificación de merchant_order recibida" : "Tipo de notificación no soportado.");
    return NextResponse.json(
      { message: topic === "merchant_order" ? "Notificación de merchant_order recibida" : "Tipo de notificación no soportado" },
      { status: topic === "merchant_order" ? 200 : 400 }
    );

  } catch (error) {
    console.error("Error en el webhook de Mercado Pago:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}