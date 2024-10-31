
import { IsPaid, Title } from "@/components";
import styles from "./page.module.css";
import ProductsGridCheckout from "@/components/products/product-grid-checkout/ProductsInCheckout";
import { useState } from "react";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { UserAddressData } from "@/components/address/UserAddressData";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/")
  }

  const address = order?.OrderAddress

  return (
    <div className={styles.container}>
      <Title title={`Orden #${id.split("-").at(-1)}`} />
      <div className={styles.carritoContainer}>
        <div className={styles.carrito}>
          <IsPaid />

          <ProductsGridCheckout params={params}/>
        </div>

        <div className={styles.checkOut}>
          <UserAddressData params={params}/>

          <div className={styles.order}>
            <h2>Resumen de orden</h2>
            <p>
              Número de productos <span>3</span>
            </p>
            <p>
              Subtotal <span>$150</span>
            </p>
            <p>
              Impuestos (21%)<span></span>
            </p>
            <p>
              Envío <span>$50</span>
            </p>

            <div className={styles.spacer} />
            <p className={styles.totalPrice}>
              Total <span>$500</span>
            </p>
          </div>

          <div className={styles.checkOutPaid}>
            <IsPaid />
          </div>
        </div>
      </div>
    </div>
  );
}
