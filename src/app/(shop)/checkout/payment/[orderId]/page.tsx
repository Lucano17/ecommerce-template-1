"use client";
import { Title, PayPalButton } from "@/components";
import styles from "./page.module.css";
import { MercadoPagoButton } from "@/components/cart/payment/payment-models/MercadoPagoButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { orderId: string };
}

export default function PaymentPage({ params }: Props) {
  const { orderId } = params;
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
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
      }
    };

    fetchPreference();

  }, [orderId, router]);

  return (
    <div className={styles.container}>
      <Title title="Payment" />
      <div className={styles.paymentButtons}>

      {preferenceId && <MercadoPagoButton preferenceId={preferenceId} />}
      </div>
    </div>
  );
}
