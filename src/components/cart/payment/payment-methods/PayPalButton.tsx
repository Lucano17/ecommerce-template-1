"use client";

import Skeleton from '@/components/skeleton/Skeleton';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return <Skeleton />;
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE", // Se añade el intent aquí
      purchase_units: [{
        amount: {
          value: "100.00",
          currency_code: "USD",
        },
      }],
    });

    return transactionId;
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      // onApprove={}
    />
  );
};
