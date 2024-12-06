"use client";

// import React, { useState } from "react";
import styles from "./TopMenu.module.css";
import Link from "next/Link";
import { titleFont } from "@/fonts/fonts";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { useCartStore, useUIStore } from "@/store";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions";
import { CategoryMenu } from "@/components";

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const openCategoryMenu = useUIStore((state) => state.openCategoryMenu);
  const closeCategoryMenu = useUIStore((state) => state.closeCategoryMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const [topMenuFull, setTopMenuFull] = useState(true);
  const [windowDimention, setWindowDimention] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectDimention = () => {
    setWindowDimention({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectDimention);
    windowDimention.width > 750 && setTopMenuFull(true);
    return () => {
      window.removeEventListener("resize", detectDimention);
    };
  }, [windowDimention]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
    setLoaded(true);
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" onClick={closeCategoryMenu}>
          <span
            className={`
                ${titleFont.className}
                ${styles.topMenuSpan}`}
          >
            Teslo
            <span> | Shop</span>
          </span>
        </Link>
        <div className={styles.navLinksContainer}>
          <div>
            <button className={styles.navMenu} onClick={openCategoryMenu}>
              Productos
            </button>
            <CategoryMenu categories={categories} />
          </div>
          {windowDimention.width > 750 && (
            <Link href="/about" className={styles.navLink}>
              Conócenos!
            </Link>
          )}
        </div>
        <div className={styles.items} onClick={closeCategoryMenu}>
          {windowDimention.width > 750 && (
            <Link href="/search" className={styles.navItem}>
              <IoSearchOutline />
            </Link>
          )}
          <Link href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}>
            <div className={styles.navItem}>
              {loaded && totalItemsInCart > 0 && (
                <span className={styles.cartNumber}>{totalItemsInCart}</span>
              )}
              <IoCartOutline />
            </div>
          </Link>

          <button className={styles.navMenu} onClick={openSideMenu}>
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};
