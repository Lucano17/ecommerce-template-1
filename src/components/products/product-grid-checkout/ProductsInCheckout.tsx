"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProductsInCheckout.module.css";
import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utils";
import { OrderType } from "@/interfaces";

interface Props {
  params: {
    id: string;
  };}

export const ProductsInCheckout = ({params}:Props) => {
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState<OrderType | null | undefined>(null);
  
  const { id } = params;
  
  useEffect(() => {
    const getOrder = async () => {
      const { ok, order } = await getOrderById(id);
      if (ok) {
        setOrder(order);
      }
    };
    getOrder();
  }, [id]);
  

  useEffect(() => {
    setLoaded(true);
  }, []);
  
  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {order?.OrderItem.map((item) => (
        <div
          key={`${item.product.slug} - ${item.size}`}
          className={styles.productsContainer}
        >
          {/*//TODO Cambiar Image */}
          <Image
            src={`/products/${item.product.ProductImage[0]?.url}`}
            width={50}
            height={55}
            alt="imagen"
          />

          <div className={styles.productContentContainer}>
            <p className={styles.title}>
              {item.size} - {item.product.title} ({item.quantity})
            </p>

            <div className={styles.priceAndQuantity}>
              <p className={styles.subtotalArticle}>{currencyFormat(item.price * item.quantity)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
