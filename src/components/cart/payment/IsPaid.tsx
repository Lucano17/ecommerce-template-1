"use client"
import React from "react";
import styles from "./IsPaid.module.css";
import { IoCardOutline } from "react-icons/io5";

// El componente recibe `isPaid` y `onStateChange` como props
export const IsPaid = ({ isPaid }: { isPaid: boolean }) => {

  return (
    <div className={styles.container}>
      {isPaid ? (
        <div className={styles.paidTrue}>
          <IoCardOutline size={30} />
          <p>Pago realizado</p>
        </div>
      ) : (
        <div className={styles.paidFalse}>
          <IoCardOutline size={30} />
          <p>Pendiente de pago</p>
        </div>
      )}
    </div>
  );
};