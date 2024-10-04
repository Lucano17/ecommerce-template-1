// product-client-component.tsx (Componente del cliente)
"use client";


import React, { useState } from "react";
import styles from "./product-client-component.module.css";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  // StockLabel,
} from "@/components";
import type { Size } from "@/interfaces";
import { useWidthDimention } from "@/hooks";
import { StockLabel } from "@/components";
import { AddToCart } from "@/app/(shop)/product/[slug]/ui/AddToCart";


export const revalidate = 604800 // 7 días



interface Props {
  product: any;
}

export const ProductClientComponent = ({ product }: Props) => {
  // const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);

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
        <StockLabel slug={product.slug}/>
        <h1>{product?.title}</h1>

        <p className={styles.price}>Precio: ${product?.price}</p>

        {/* <div>
          <SizeSelector
            selectedSize={selectedSize}
            availableSizes={product?.sizes || []}
            onSelectedSizeChange={setSelectedSize} // Cambiar la talla seleccionada
          />
        </div>

        <div>
          <QuantitySelector quantity={1} />
        </div>

        <button className={styles.cartButton}>Agregar al carrito</button> */}
        <AddToCart product={product}/>

        <div className={styles.description}>
          <h3>Descripción</h3>
          <p className={styles.descriptionText}>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};
