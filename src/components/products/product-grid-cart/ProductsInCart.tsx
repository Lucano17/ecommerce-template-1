"use client";

import { QuantitySelector, Title } from "@/components";
import Image from "next/image";
import styles from "./ProductsInCart.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { currencyFormat } from "@/utils";





export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const removeProduct = useCartStore((state) => state.removeProduct)

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
            alt={product.title}
          />

          <div className={styles.productContentContainer}>
            <Link href={`/product/${product.slug}`} className={styles.title}>
              {product.size} - {product.title}
            </Link>

            <div className={styles.priceAndQuantity}>
              <p className={styles.price}>{currencyFormat(product.price)}</p>
              <div className={styles.quantitySelector}>
                <QuantitySelector
                  quantity={product.quantity}
                  onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
                />
              </div>
              <div className={styles.remove}>
                <FaTrashAlt onClick={()=>removeProduct(product)}/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
