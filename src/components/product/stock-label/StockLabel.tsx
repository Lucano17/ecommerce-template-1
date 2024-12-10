"use client";

import { getStockBySlug } from "@/actions";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setIsLoading(false);
    };
    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        // <h3 className={styles.skeleton}>&nbsp;</h3>
        <span>Cargando stock...</span>
      ) : (
        <span>Stock: {stock}</span>
      )}
    </>
  );
};
