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
        <h3>
          Stock: {stock}
        </h3>
    </>
  );
};