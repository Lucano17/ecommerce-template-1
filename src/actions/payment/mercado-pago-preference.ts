import { MercadoPagoConfig, Preference, Payment } from "mercadopago"
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
  const accessToken = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

  console.log("MP_access_token:", accessToken)
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
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
        },
        auto_return: "approved",
      },

    });
    
    
    
    
    return preference.id

  } catch (error) {
    console.log(error)
  }

}