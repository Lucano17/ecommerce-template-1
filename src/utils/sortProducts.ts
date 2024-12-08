import { Product } from "@/interfaces";


export type SortOption = "price_asc" | "price_desc" | "date_asc" | "date_desc" | "name_asc" | "name_desc";

export const sortProducts = (products: Product[], sortOption: SortOption): Product[] => {
  const sortedArray = [...products]; // Creamos una copia para no mutar el original

  switch (sortOption) {
    case "price_asc":
      return sortedArray.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedArray.sort((a, b) => b.price - a.price);
    // case "date_asc":
    //   return sortedArray.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    // case "date_desc":
    //   return sortedArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "name_asc":
      return sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    case "name_desc":
      return sortedArray.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sortedArray;
  }
};
