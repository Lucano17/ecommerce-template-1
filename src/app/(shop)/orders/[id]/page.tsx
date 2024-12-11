"use client";

import { useState, useEffect } from "react";
import { IsPaid, Title, ProductsInCheckout, UserAddressData, PaymentMenu } from "@/components";
import styles from "./page.module.css";
import { useUIStore } from "@/store";
import { currencyFormat } from "@/utils";
import { getOrderById } from "@/actions";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

interface Order {
  itemsInOrder: number;
  subtotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
}

export default function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  const openPaymentMenu = useUIStore((state) => state.openPaymentMenu);
  
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { ok, order, message } = await getOrderById(id);

        if (!ok || !order) {
          setError(message || "Orden no encontrada.");
          return;
        }

        setOrder(order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Error al cargar la orden. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await fetch("/api/payment/mercadopago/preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: id }),
        });
        const data = await response.json();

        if (data.preferenceId) {
          setPreferenceId(data.preferenceId);
        } else {
          throw new Error("No preference ID returned");
        }
      } catch (error) {
        console.error("Error fetching preference:", error);
      }
    };

    fetchPreference();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>No se encontró la orden.</p>;
  }

  return (
    <div className={styles.container}>
      <Title title={`Orden #${id.split("-").at(-1) || "Desconocida"}`} />

      <div className={styles.carritoContainer}>
        <div className={styles.carrito}>
          <span className={styles.state}>
            <IsPaid id={id} />
          </span>
          <ProductsInCheckout params={{ id }} />
        </div>

        <div className={styles.paymentMenu}>
          <PaymentMenu preferenceId={preferenceId} />
        </div>

        <div className={styles.checkOut}>
          <UserAddressData params={{ id }} />

          <div className={styles.order}>
            <h2>Resumen de orden</h2>
            <p>
              Número de productos <span>{order.itemsInOrder}</span>
            </p>
            <p>
              Subtotal <span>{currencyFormat(order.subtotal)}</span>
            </p>
            <p>
              Impuestos (21%)<span>{currencyFormat(order.tax)}</span>
            </p>
            <div className={styles.spacer} />
            <p className={styles.totalPrice}>
              Total <span>{currencyFormat(order.total)}</span>
            </p>

            {order.isPaid ? (
              <Link href={`/checkout/shipping/${id}`}>Detalles del envío</Link>
            ) : (
              <button onClick={openPaymentMenu}>PAGAR</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
