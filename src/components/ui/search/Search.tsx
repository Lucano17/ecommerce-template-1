"use client";

import { useState } from "react";
import styles from "./Search.module.css";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
  styleClass?: string;
}

export const Search = ({
  placeholder = "Buscar productos...",
  styleClass,
}: SearchProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const searchParams = new URLSearchParams(); // Crea nuevos parámetros de búsqueda
      searchParams.set("q", query); // Agrega el parámetro de búsqueda
      searchParams.set("page", "1"); // Reinicia la paginación

      router.push(`/?${searchParams.toString()}`); // Redirige con los nuevos parámetros
    } catch (error) {
      console.error("Error al buscar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.search} ${styleClass}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {/* {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};
