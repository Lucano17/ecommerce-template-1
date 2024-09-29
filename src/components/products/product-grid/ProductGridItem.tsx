"use client";

import React from "react";
import { useState } from "react";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductGridItem.module.css"

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className={styles.container}>
      <Link href={`/product/${product.slug}`}>
        <Image
        className={styles.productImage}
          src={`/products/${displayImage}`}
          alt={product.title}
          width={250}
          height={250}
          onMouseEnter={()=>{setDisplayImage(product.images[1])}}
          onMouseLeave={()=>{setDisplayImage(product.images[0])}}
          priority={true}
        />
      
      <div className={styles.productInfo}>

        <p
        className={styles.productTitle}>
          {product.title}
        </p>

        <span>${product.price}</span>
      </div>
      </Link>
    </div>
  );
};
