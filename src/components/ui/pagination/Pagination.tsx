"use client"

import React, { useState } from "react";
import styles from "./Pafination.module.css";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePaginationNumbers } from "@/utils";
import Link from "next/link";



interface Props {
  totalPages: number;
}


export const Pagination = ({totalPages}:Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [thisPage, setThisPage] = useState(false)

  const currentPage = Number(searchParams.get("page")) ?? 1;
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string)=> {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...")
    {
      return `${pathname}?${params.toString()}`
    }
    if (+pageNumber <= 0){
      return `${pathname}`;
    }

    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`
    }

    params.set("page",pageNumber.toString());
    return `${pathname}?${params.toString()}`

  }

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul>
          <li className={styles.li}>
            <Link href={createPageUrl(currentPage - 1)}><IoChevronBackOutline/></Link>
          </li>
          {
            allPages.map((page, index)=>(
              <li key={page}>
            <Link href={createPageUrl(page)} className={
              page === currentPage ? styles.activePage : styles.nonActivePage
            }>{page}</Link>
          </li>
            ))
          }
          <li>
            <Link href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline/></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
