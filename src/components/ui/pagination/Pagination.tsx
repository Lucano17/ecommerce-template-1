"use client"

import React, { useState } from "react";
import styles from "./Pagination.module.css";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { generatePaginationNumbers } from "@/utils";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? "1"; // Definimos página 1 como valor por defecto
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  const allPages = generatePaginationNumbers(currentPage, totalPages); // Genera los números de página

  // Función para crear URLs con los parámetros adecuados
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    
    if (+pageNumber <= 0 || +pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`; // Evita números de página no válidos
    }

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`; // Mantiene otros parámetros como sortBy intactos
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul>
          <li className={styles.li}>
            <Link href={createPageUrl(currentPage - 1)}>
              <IoChevronBackOutline />
            </Link>
          </li>
          {
            allPages.map((page, index) => (
              <li key={page}>
                <Link href={createPageUrl(page)} className={page === currentPage ? styles.activePage : styles.nonActivePage}>
                  {page}
                </Link>
              </li>
            ))
          }
          <li>
            <Link href={createPageUrl(currentPage + 1)}>
              <IoChevronForwardOutline />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
