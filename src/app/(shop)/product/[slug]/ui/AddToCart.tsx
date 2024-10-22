"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import React, { useState } from "react";
import styles from "./AddToCart.module.css";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore( state => state.addProductToCart)
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!selectedSize) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      image: product.images[0]
    }
    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
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
