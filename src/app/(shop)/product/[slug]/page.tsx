"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import type { Size } from "@/interfaces";

interface Props {
  params: {
    slug: string;
  };
}

export default function ({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
    return null;
  }
  
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]); // Estado inicial con la primera talla
  
  
  const [windowDimention, setWindowDimention] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectDimention = () => {
    setWindowDimention({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", detectDimention);
    windowDimention.width < 900 && setIsMobile(true);
    return () => {
      window.removeEventListener("resize", detectDimention);
    };
}, [windowDimention]);


  return (
    <div className={styles.container}>
      <div className={styles.imagesContainer}>

        <div>
        { windowDimention.width < 900 && isMobile ? (
          <ProductMobileSlideShow
            title={product?.title || "Producto sin título"}
            images={product?.images || []}
          />
        ) : <ProductSlideShow
        title={product?.title || "Producto sin título"}
        images={product?.images || []} />}
      </div>

        </div>
      <div className={styles.dataContainer}>
        <h1>{product?.title}</h1>

        <p className={styles.price}>Precio: ${product?.price}</p>

        <div>
          <SizeSelector
            selectedSize={selectedSize}
            availableSizes={product?.sizes || []}
            onSelectedSizeChange={setSelectedSize} // Cambiar la talla seleccionada
          />
        </div>

        <div>
          <QuantitySelector quantity={1} />
        </div>

        <button className={styles.cartButton}>Agregar al carrito</button>

        <div className={styles.description}>
          <h3>Descripción</h3>
          <p className={styles.descriptionText}>{product?.description}</p>
        </div>
      </div>
    </div>
  );
}
