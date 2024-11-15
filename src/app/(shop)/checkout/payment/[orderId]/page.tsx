"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Title, MercadoPagoButton } from "@/components";
import styles from "./page.module.css";
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
    if (preferenceId) return;  // Evitar hacer la llamada si ya tenemos preferenceId
    const fetchPreference = async () => {
      try {
        const response = await fetch("/api/payment/mercadopago/preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });
        const data = await response.json();
        console.log("Data received from API:", data);
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
    if (preferenceId) {
      console.log("Updated preferenceId:", preferenceId);  // Este log muestra el valor actualizado de preferenceId
    }
  }, [preferenceId]);  // Este effect se ejecuta cada vez que preferenceId cambia

  return (
    <div className={styles.container}>
      <Title title="Payment" />
      <div className={styles.paymentContainer}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className={styles.paymentButtons}>
            {preferenceId && <MercadoPagoButton preferenceId={preferenceId} />}
          </div>
        )}
      </div>
    </div>
  );
}
