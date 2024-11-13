import { NextRequest, NextResponse } from 'next/server';
import { mercadopago, updateOrderStatus } from "@/actions";
import MercadoPagoConfig from 'mercadopago';



export async function POST(req: NextRequest) {

  try {

    // const orderId = body.data.external_reference; // Usa `external_reference` para identificar la orden en tu sistema

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
        headers: {
          "Authorization": `Bearer ${mercadopago.accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Payment data from Mercado Pago:", data);

        // Actualiza el estado de la orden en tu base de datos
        await updateOrderStatus(data.external_reference, data.status);

        // Responde a Mercado Pago con un estado 200 para confirmar que recibí el webhook
        return NextResponse.json({ message: "Webhook received and processed" });
      } else {
        console.log("No se ha logrado conectar correctamente con el webhook de Mercado Pago");
        return NextResponse.json({ error: "Failed to connect to Mercado Pago" }, { status: 500 });
      }
    } else if (topic === "merchant_order") {
      // Aquí manejo el caso para `merchant_order` si es necesario
      console.log("Notificación recibida para merchant_order, no se procesa en este endpoint.");
      return NextResponse.json({ message: "Notificación de merchant_order recibida" });
    } else {
      console.log("Tipo de notificación no soportado.");
      return NextResponse.json({ error: "Tipo de notificación no soportado" }, { status: 400 });
    }

  } catch (error) {
    console.error("Error en el webhook de Mercado Pago:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}