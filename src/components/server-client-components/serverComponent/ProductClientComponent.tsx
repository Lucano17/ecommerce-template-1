// product-client-component.tsx (Componente del cliente)
"use client";

import React from "react";
import styles from "./ProductClientComponent.module.css";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
} from "@/components";
import { useWidthDimention } from "@/hooks";
import { StockLabel } from "@/components";
import { AddToCart } from "@/app/(shop)/product/[slug]/ui/AddToCart";


export const revalidate = 604800 // 7 días



interface Props {
  product: any;
}

export const ProductClientComponent = ({ product }: Props) => {

  const isMobile = useWidthDimention();

  return (
    <div className={styles.container}>
      <div className={styles.imagesContainer}>
        <div>
          {isMobile ? (
            <ProductMobileSlideShow
              title={product?.title || "Producto sin título"}
              images={product?.images || []}
            />
          ) : (
            <div className={styles.productSlideShow}>
              <ProductSlideShow
                title={product?.title || "Producto sin título"}
                images={product?.images || []}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.dataContainer}>
        <h1>{product?.title}</h1>
        <StockLabel slug={product.slug}/>

        <p className={styles.price}>Precio: <span>${product?.price}</span></p>
        <AddToCart product={product}/>

        <div className={styles.description}>
          <h3>Descripción</h3>
          <p className={styles.descriptionText}>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};
