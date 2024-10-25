"use client";

import React, { useEffect, useState } from "react";
import styles from "./PlaceOrder.module.css";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const PlaceOrder = () => {
  const address = useAddressStore((state) => state.address);
  const [loaded, setLoaded] = useState(false);
  const {itemsInCart, subtotal, tax, total} = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.checkOut}>
      <div className={styles.address}>
        <h2>Dirección de entrega</h2>
        <h3>
          {address.firstName} {address.lastName}
        </h3>
        <p>{address.phone}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>P.C. {address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
      </div>

      <div className={styles.order}>
      <h2>Resumen de orden</h2>
      <p>Número de artículos<span>{itemsInCart}</span></p>
      <p>Subtotal <span>{currencyFormat(subtotal)}</span></p>
      <p>Impuestos (21%)<span>{currencyFormat(tax)}</span></p>
      <p>Envío <span>$50</span></p>
      <div className={styles.spacer} />
      <p className={styles.totalPrice}>Total<span>{currencyFormat(total)}</span>
      </p>
      </div>

      <div >
        <button className={styles.goToOrder}
        // href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
