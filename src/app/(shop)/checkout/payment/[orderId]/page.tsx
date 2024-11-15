"use client";
import { Title, PayPalButton, MercadoPagoButton } from "@/components";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skeleton from "@/components/skeleton/Skeleton";

interface Props {
  params: { orderId: string };
}

export default function PaymentPage({ params }: Props) {
  const { orderId } = params;
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (preferenceId) return
    const fetchPreference = async () => {
      try {
        const response = await fetch("/api/payment/mercadopago/preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await response.json();
        console.log("Data received from API:", data)
        if (data.preferenceId) {
          setPreferenceId(data.preferenceId);
        } else {
          throw new Error("No preference ID returned");
        }

        console.log(preferenceId)
      } catch {
        router.push("/orders");
      } finally {
        setIsLoading(false)
      }
    };

    fetchPreference();

  }, [orderId, preferenceId, router]);

  return (
    <div className={styles.container}>
      <Title title="Payment" />
      <div className={styles.paymentContainer}>
        
      {isLoading ? (
        <Skeleton/>
      ) : (
        
        <div className={styles.paymentButtons}>

      {preferenceId && <MercadoPagoButton preferenceId={preferenceId} />}
      </div>
      )}
      </div>
    </div>
  );
}
