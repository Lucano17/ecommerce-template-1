import { NextRequest, NextResponse } from 'next/server';
import { createMercadoPagoPreference } from "@/actions/payment/mercado-pago-preference";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    const preferenceId = await createMercadoPagoPreference({ id: orderId });
    return NextResponse.json({ preferenceId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating Mercado Pago preference" }, { status: 500 });
  }
}
