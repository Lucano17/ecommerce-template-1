"use client";

import { useState, useEffect } from "react";
import { IsPaid, Title, ProductsInCheckout, UserAddressData } from "@/components";
import styles from "./page.module.css";
import { useUIStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/actions";
import Link from "next/link";
import { PaymentsMenu } from "@/components/cart/payment/PaymentsMenu";

interface Props {
  params: {
    id: string;
    orderId: string;
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
  const { id, orderId } = params;
  const router = useRouter();
  const openPaymentsMenu = useUIStore((state) => state.openPaymentsMenu);

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { ok, order, message } = await getOrderById(id); // Uso del server action

        if (!ok || !order) {
          setError(message || "Orden no encontrada.");
          return; // Evitar redirigir
        }

        setOrder({
          itemsInOrder: order.OrderItem.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: order.OrderItem.reduce((sum, item) => sum + item.price * item.quantity, 0),
          tax: order.OrderItem.reduce((sum, item) => sum + item.price * item.quantity * 0.21, 0),
          total: order.total || 0,
          isPaid: order.isPaid || false,
        });
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Error al cargar la orden. Por favor, intenta nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id, router]);

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
              <div>
                <button onClick={openPaymentsMenu}>PAGAR</button>
                <PaymentsMenu params={params} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
