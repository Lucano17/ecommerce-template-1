"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import React, { useState } from "react";
import styles from "./AddToCart.module.css";
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    console.log({ selectedSize, quantity, product });
    setPosted(true);
  };
  return (
    <>
      {posted && !selectedSize && <span>Debe de seleccionar una talla</span>}
      <div>
        <SizeSelector
          selectedSize={selectedSize}
          availableSizes={product?.sizes || []}
          onSelectedSizeChange={setSelectedSize} // Cambiar la talla seleccionada
        />
      </div>

      <div>
        <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      </div>

      <button className={styles.cartButton} onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
