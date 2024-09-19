"use client"

// import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/Link";
import { titleFont } from "@/fonts/fonts";
import {IoSearchOutline, IoCartOutline} from "react-icons/io5"
import { useUIStore } from "@/store";

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu)

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
          <Link href="/category/men">Hombres</Link>
          <Link href="/category/women">Mujeres</Link>
          <Link href="/category/kids">Niños</Link>
        </div>
        <div className={styles.items}>
          <Link href="/search"><IoSearchOutline/></Link>
          <Link href="/cart">
          <div>
            <span className={styles.cartNumber}>3</span>
          <IoCartOutline/>
          </div>
          </Link>
          <button
          onClick={openSideMenu}>
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};
