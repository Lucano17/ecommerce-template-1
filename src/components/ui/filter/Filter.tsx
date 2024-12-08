"use client"

import { useRouter } from "next/navigation";

export const Filter = () => {
  const router = useRouter();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value;
    // Redirigimos a la misma página con el nuevo parámetro sortBy en la URL
    console.log(`/?page=1&sortBy=${sortBy}`);
    router.push(`/?page=1&sortBy=${sortBy}`);  // Asegúrate de tener la ruta correcta
  };

  return (
    <>
      <label htmlFor="sort">Ordenar por:</label>
      <select id="sort" onChange={handleSortChange}>
        <option value="price_asc">Precio (menor a mayor)</option>
        <option value="price_desc">Precio (mayor a menor)</option>
        <option value="name_asc">Nombre (A-Z)</option>
        <option value="name_desc">Nombre (Z-A)</option>
      </select>
    </>
  );
};
