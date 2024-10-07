"use client"

import React, { useEffect, useState } from "react";
import styles from "./OrderSummary.module.css";
import Link from "next/link";
import { useCartStore } from "@/store";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const {itemsInCart, subtotal, tax, total} = useCartStore(state => state.getSummaryInformation())

  useEffect(()=>{
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Loading...</p>




  return (
    <div className={styles.checkOut}>
      <h2>Resumen de orden</h2>
      <p>Número de artículos<span>{itemsInCart}</span></p>
      <p>Subtotal <span>{subtotal}</span></p>
      <p>Impuestos (21%)<span>{tax}</span></p>
      <p>Envío <span>$50</span></p>
      <div className={styles.spacer} />
      <p className={styles.totalPrice}>Total<span>{total}</span>
      </p>
      <div className={styles.goToOrder}>
        <Link href="/checkout/address">Checkout</Link>
      </div>
    </div>
  );
};
