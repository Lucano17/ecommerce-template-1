import React from "react";
import { Product } from "@/interfaces";
import styles from "./ProductGrid.module.css";
import { ProductGridItem } from "./ProductGridItem";
import { Filter, Search } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  products: Product[]
  searchParams: {
    page?: string;
    sortBy?: string;
    q?: string
  };
}

export const ProductGrid = async({ products, searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const sortBy = searchParams.sortBy || "price_asc";  // Valor por defecto
  const query = searchParams.q || "";

  // Obtenemos los productos filtrados y paginados desde el servidor
  const {  currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    sortBy,
    query,
  });


  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Search styleClass={styles.search} />
        <Filter />
      </div>
    <div className={styles.gridContainer}>
      {products.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
    </div>
  );
};
