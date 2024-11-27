"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Title, MercadoPagoButton, PayPalButton } from "@/components";
import { getOrderById } from "@/actions";
import styles from "./page.module.css";
import Skeleton from "@/components/skeleton/Skeleton";

interface Props {
  params: {
    orderId: string
    id: string
   };
}

export default function PaymentPage({ params }: Props) {
  const { orderId, id } = params;
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null)
  const router = useRouter();

  useEffect(() => {
    if (preferenceId) return;
    const fetchPreference = async () => {

      try {
        const response = await fetch("/api/payment/mercadopago/preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await response.json();

        if (data.preferenceId) {
          setPreferenceId(data.preferenceId);
        } else {
          throw new Error("No preference ID returned");
        }
      } catch {
        router.push("/orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreference();
  }, [orderId, router]);

  useEffect(() => {
  }, [preferenceId]);  // Este effect se ejecuta cada vez que preferenceId cambia

  useEffect(() => {
    const getOrder = async () => {
      const { ok, order } = await getOrderById(id);

      if (ok) {
        setOrder(order);
      } else {
        return {
          message: "No se ha encontrado la orden"
        }
      }
      setIsLoading(false);
    };

    getOrder();
  }, [id, router]);

  return (
    <div className={styles.container}>
      <Title title="Payment" />
      <div className={styles.paymentContainer}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className={styles.paymentButtons}>
            {preferenceId && <MercadoPagoButton preferenceId={preferenceId} />}
            {/* <PayPalButton 
            amount={order!.total} 
            orderId={order!.id}/> */}
          </div>
        )}
      </div>
    </div>
  );
}
