"use client";

import Skeleton from '@/components/skeleton/Skeleton';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';

interface Props {
  orderId: string;
  amount: number
}


export const PayPalButton = ({orderId, amount}: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return <Skeleton />;
  }
  
  const rountedAmount = (Math.round(amount * 100))/100
  
  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          value: `${rountedAmount}`,
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
