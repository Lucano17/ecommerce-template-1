import { NextRequest, NextResponse } from 'next/server';
import { mercadopago, updateOrderStatus } from "@/actions";
import MercadoPagoConfig from 'mercadopago';



export async function POST(req: NextRequest) {
  
  try {
    const body = await req.json();
    const paymentStatus = body.data.status;
    const paymentId = body.data.id;
    const orderId = body.data.external_reference; // Usa `external_reference` para identificar la orden en tu sistema

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${mercadopago.accessToken}`
      }
    })

    if (response.ok) {
      const data = await response.json();
      console.log("Webhook response:", data)
    } else {
      console.log("No se ha logrado conectar correctamente con el webhook")
    }



    // Actualiza el estado de la orden en tu base de datos
    await updateOrderStatus(orderId, paymentStatus);

    return NextResponse.json({ message: "Webhook received and processed" }, {status: 200});

  } catch (error) {
    console.error("Error in Mercado Pago webhook:", error);
    return NextResponse.json({ error: "Error processing webhook" }, { status: 500 });
  }
}
