"use client"

import { useRouter, usePathname } from "next/navigation";
import styles from "./Filter.module.css"

export const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set("sortBy", sortBy); // Actualiza el parámetro sortBy
  searchParams.set("page", "1"); // Reinicia la paginación

  const newPath = `${pathname}?${searchParams.toString()}`;
  router.push(newPath);
};

    // if (pathname.startsWith("/")) {
    //   router.push(`/?page=1&sortBy=${sortBy}`);
    // } else if (pathname.startsWith("/gender")) {
    //   router.push(`/gender/${pathname.split("/")[2]}?page=1&sortBy=${sortBy}`);
    // } else if (pathname.startsWith("/category")) {
    //   router.push(`/category/${pathname.split("/")[2]}?page=1&sortBy=${sortBy}`);
    // } else {
    //   router.push(`/?page=1&sortBy=${sortBy}`);
    // }

  

  return (
    <>
    <div className={styles.container}>
      <div className={styles.sortContainer}>
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="price_asc">Precio (menor a mayor)</option>
        <option value="price_desc">Precio (mayor a menor)</option>
        <option value="name_asc">Nombre (A-Z)</option>
        <option value="name_desc">Nombre (Z-A)</option>
      </select>
      </div>
    </div>
    </>
  );
};
