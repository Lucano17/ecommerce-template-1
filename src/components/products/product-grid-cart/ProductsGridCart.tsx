"use client";

import { QuantitySelector, Title } from "@/components";
import Image from "next/image";
import styles from "./ProductsGridCart.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";
export const ProductsGridCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

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
            height={50}
            alt={product.title}
          />

          <div>
            <Link href={`/product/${product.slug}`} className={styles.title}>
              {product.title}
            </Link>

            <div className={styles.priceAndQuantity}>
              <p className={styles.price}>{product.price}</p>
              <div className={styles.quantitySelector}>
                <QuantitySelector
                  quantity={3}
                  onQuantityChanged={(value) => console.log(value)}
                />
              </div>
              <div className={styles.remove}>
                <FaTrashAlt />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
