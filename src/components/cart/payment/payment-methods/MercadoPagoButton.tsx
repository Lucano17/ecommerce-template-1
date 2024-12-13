"use client";

import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";


interface MercadoPagoButtonProps {
  preferenceId: string;
}

export const MercadoPagoButton = ({ preferenceId }: MercadoPagoButtonProps) => {
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, {
      locale: "es-AR",
    });
  }, []);

  if (!preferenceId) {
    console.error("No preference ID provided");
    return <div>Error: Missing payment details</div>;
}

  return (
    <div id="wallet_container">
      <Wallet
        initialization={{ preferenceId }}
        customization={{ texts: { valueProp: "smart_option" } }}
      />
    </div>
  );
};
