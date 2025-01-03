import { MercadoPagoConfig, Preference } from "mercadopago"
import { getOrderById } from "../order/get-order-by-id";
import dotenv from "dotenv";
dotenv.config();



interface Props {
  id: string
}

export const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN!,
});

export const createMercadoPagoPreference = async ({ id }: Props) => {
  const { order } = await getOrderById(id)
  try {
    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            id,
            title: "Compra desde tienda online",
            quantity: 1,
            unit_price: order?.total! || 0,
            currency_id: "ARS",
          },
        ],
        external_reference: id,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${id}`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${id}`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${id}`,
        },
        auto_return: "approved",
        // notification_url: "https://b0vd0lvs-3000.brs.devtunnels.ms/api/payment/mercadopago/webhook",
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/mercadopago/webhook`,

      },
    });
    return preference.id
  } catch (error) {
    return {
      ok: false,
      message: "Error creando el preferenceId"
    }
  }

}