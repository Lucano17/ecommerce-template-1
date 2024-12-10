"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import styles from "./ProductsInCheckout.module.css";
import { currencyFormat } from "@/utils";

export const ProductsInCheckout = () => {
  // const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug} - ${product.size}`}
          className={styles.productsContainer}
        >
          <Image
            src={`/products/${product.image}`}
            width={50}
            height={55}
            alt="imagen"
          />

          <div className={styles.productContentContainer}>
            <p className={styles.title}>
              {product.size} - {product.title} ({product.quantity})
            </p>

            <div className={styles.priceAndQuantity}>
              <p className={styles.subtotalArticle}>
                {currencyFormat(product.price * product.quantity)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
