"use client";

import { useState } from "react";
import styles from "./Search.module.css"
import router from "next/router";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder?: string;
  styleClass?: string;
}

export const Search = ({ placeholder = "Buscar productos...", styleClass, }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      router.push(`/?q=${encodeURIComponent(query)}`)
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
      <button onClick={handleSearch} disabled={loading} className={styles.button}>
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
