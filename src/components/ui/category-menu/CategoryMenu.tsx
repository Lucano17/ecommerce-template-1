"use client";

import { useUIStore } from "@/store";
import React from "react";
import styles from "./CategoryMenu.module.css";
import { Category } from "@prisma/client";
import Link from "next/link";

interface Props {
  categories: Category[];
}

interface ProductType {
  genders: "men" | "women" | "kid" | "unisex";
}

export const CategoryMenu = ({ categories }: Props) => {
  const isCategoryMenuOpen = useUIStore((state) => state.isCategoryMenuOpen);
  const closeCategoryMenu = useUIStore((state) => state.closeCategoryMenu);

  return (
    <div className={styles.container}>
      {isCategoryMenuOpen && <div className={styles.blackBackground}></div>}
      {isCategoryMenuOpen && (
        <div
          className={styles.blurBackground}
          onClick={closeCategoryMenu}
        ></div>
      )}
      <div>
        {isCategoryMenuOpen && (
          <div className={styles.categoryContainer}>
            <section className={styles.categorySection}>
              <ul>
                <li>
                  <Link
                    href="/category/men"
                    onClick={() => closeCategoryMenu()}
                  >
                    Hombres
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/women"
                    onClick={() => closeCategoryMenu()}
                  >
                    Mujeres
                  </Link>
                </li>
                <li>
                  <Link
                    href="/category/kid"
                    onClick={() => closeCategoryMenu()}
                  >
                    Niños
                  </Link>
                </li>
                {/* <li>
                  <Link href="/category/unisex"
                  onClick={() => closeCategoryMenu()}>Unisex</Link>
                </li> */}
              </ul>
            </section>
            <aside className={styles.categorySection}>
              <ul>
                {categories?.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.name}`}
                      onClick={() => closeCategoryMenu()}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
