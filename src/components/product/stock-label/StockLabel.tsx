"use client";

import { getStockBySlug } from "@/actions";
import { Suspense, useEffect, useState } from "react";
import styles from "./StockLabel.module.css"

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    console.log(inStock)
    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
    {
      isLoading
      ? (
          // <h3 className={styles.skeleton}>&nbsp;</h3>
          <span>Cargando stock...</span>
      )
      : (
        <span>
          Stock: {stock}
        </span>
      )
    }
    </>
  );
};