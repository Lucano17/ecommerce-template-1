// Sorter.tsx
"use client";

import { useState, useEffect } from "react";

type ProductWithImages = {
  ProductImage: { url: string }[];
  gender: string;
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  categoryId: string;
};

type SortOption = "price_asc" | "price_desc" | "name_asc" | "name_desc";

interface SorterProps {
  products: ProductWithImages[];
}

export const Sorter: React.FC<SorterProps> = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState<ProductWithImages[]>(products);
  const [selectedSort, setSelectedSort] = useState<SortOption>("price_asc");

  useEffect(() => {
    const sortProducts = (sortOption: SortOption) => {
      const sortedArray = [...products];
      switch (sortOption) {
        case "price_asc":
          sortedArray.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          sortedArray.sort((a, b) => b.price - a.price);
          break;
        case "name_asc":
          sortedArray.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "name_desc":
          sortedArray.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
      setSortedProducts(sortedArray);
    };

    sortProducts(selectedSort);
  }, [selectedSort, products]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value as SortOption;
    setSelectedSort(sortOption);
  };

  return (
    <>
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" value={selectedSort} onChange={handleSortChange}>
        <option value="price_asc">Precio (menor a mayor)</option>
        <option value="price_desc">Precio (mayor a menor)</option>
        <option value="name_asc">Nombre (A-Z)</option>
        <option value="name_desc">Nombre (Z-A)</option>
      </select>
    </>
  );
};
