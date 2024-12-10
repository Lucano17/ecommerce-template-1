"use client"

import React, { useEffect, useState } from "react";
import styles from "./IsPaid.module.css";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";

interface Props {
  id: string;
}

export const IsPaid: React.FC<Props> = ({ id }) => {
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { ok, order } = await getOrderById(id);
        if (ok) {
          setIsPaid(order?.isPaid || false);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setIsPaid(false)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className={styles.container}>
      {isPaid ? (
        <div className={styles.paidTrue}>
          <IoCardOutline size={20} className={styles.paidCardIcon} />
          <p>Pago realizado</p>
        </div>
      ) : (
        <div className={styles.paidFalse}>
          <IoCardOutline size={20} className={styles.paidCardIcon} />
          <p>Pendiente de pago</p>
        </div>
      )}
    </div>
  );
};
