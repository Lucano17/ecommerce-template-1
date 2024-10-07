"use client"

// import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/Link";
import { titleFont } from "@/fonts/fonts";
import {IoSearchOutline, IoCartOutline} from "react-icons/io5"
import { useCartStore, useUIStore } from "@/store";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu)
  const totalItemsInCart = useCartStore(state => state.getTotalItems())
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    setLoaded(true)
  },[])

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/">
          <span
            className={`
                ${titleFont.className}
                ${styles.topMenuSpan}`}
          >
            Teslo
            <span> | Shop</span>
          </span>
        </Link>
        <div className={styles.categoryContainer}>
          <Link href="/category/men" className={styles.categoryLink}>Hombres</Link>
          <Link href="/category/women" className={styles.categoryLink}>Mujeres</Link>
          <Link href="/category/kid" className={styles.categoryLink}>Niños</Link>
        </div>

        <div className={styles.items}>

          <Link href="/search"  className={styles.navItem}><IoSearchOutline/></Link>
          <Link href={
            ((totalItemsInCart === 0) && loaded)
            ? "/empty"
            :"/cart"}>

          <div className={styles.navItem}>
            {
              (loaded && totalItemsInCart > 0) && (
                <span className={styles.cartNumber}>{totalItemsInCart}</span>
              )
            }
          <IoCartOutline/>
          </div>
          
          </Link>

          <button className={styles.navMenu}
          onClick={openSideMenu}>
            Menu
          </button>

        </div>

      </div>
    </nav>
  );
};
