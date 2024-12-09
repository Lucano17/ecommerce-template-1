"use client";

import { useState } from "react";
import styles from "./Search.module.css"

interface SearchProps {
  placeholder?: string;
  styleClass?: string;
  onSearch?: (results: any[]) => void; // Callback para manejar los resultados
}

export const Search = ({ placeholder = "Buscar productos...", styleClass, onSearch }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/products/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      if (onSearch) onSearch(data); // Llamar al callback si está definido
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
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
