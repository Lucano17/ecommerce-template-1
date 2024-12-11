"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store";
import { useRouter } from "next/navigation";
import { Title, MercadoPagoButton } from "@/components";
import { getOrderById } from "@/actions";
import Skeleton from "@/components/skeleton/Skeleton";
import AlertMessage from "@/components/ui/alert/AlertMessage";
import styles from "./PaymentsMenu.module.css";

interface Props {
  params: {
    orderId: string;
    id: string;
  };
}

export const PaymentsMenu = ({ params }: Props) => {
  const { orderId, id } = params;
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  const isPaymentsMenuOpen = useUIStore((state) => state.isPaymentsMenuOpen);
  const closePaymentsMenu = useUIStore((state) => state.closePaymentsMenu);

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
  }, [orderId, router, preferenceId]);

  useEffect(() => {
    const getOrder = async () => {
      const { ok, order } = await getOrderById(id);

      if (ok) {
        setOrder(order);
      } else {
        return {
          message: "No se ha encontrado la orden",
        };
      }
      setIsLoading(false);
    };

    getOrder();
  }, [id, router]);
  return (
    <div className={styles.container}>
      {isPaymentsMenuOpen && <div className={styles.blackBackground}></div>}
      {isPaymentsMenuOpen && (
        <div
          className={styles.blurBackground}
          onClick={closePaymentsMenu}
        ></div>
      )}
      {isPaymentsMenuOpen && (
        <div className={styles.paymentsContainer}>
          <AlertMessage
            alertMessage="RECUERDA QUE ESTA ES UNA TIENDA DE PRUEBA. 
                      Por favor, utiliza cuentas de prueba para realizar los pagos"
          />
          <Title title="Payment methods" />

          <div className={styles.paymentContainer}>
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className={styles.paymentButtons}>
                {preferenceId && (
                  <MercadoPagoButton preferenceId={preferenceId} />
                )}
                {/* <PayPalButton 
      amount={order!.total} 
      orderId={order!.id}/> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
