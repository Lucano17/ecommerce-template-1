"use client";

import React from "react";
import styles from "./SideBar.module.css";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import Link from "next/link";

export const SideBar = () => {
  return (
    <div>
      <div className={styles.blackBackground}></div>
      <div className={styles.blurBackground}></div>
      <nav className={styles.sideBar}>
        <IoCloseOutline
          className={styles.closeIcon}
          onClick={() => console.log("click")}
        />
        <div className={styles.searchContainer}>
          <IoSearchOutline className={styles.searchIcon} size={20} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar"
          />
        </div>

        <Link href={"/"} className={styles.navLinks}>
          <IoPersonOutline className={styles.navIcon} size={25} />
          <span className={styles.navLinksText}>Perfil</span>
        </Link>

        <Link href={"/"} className={styles.navLinks}>
          <IoTicketOutline className={styles.navIcon} size={25}/>
          <span className={styles.navLinksText}>Orders</span>
        </Link>

        <Link href={"/"} className={styles.navLinks}>
          <IoLogInOutline className={styles.navIcon} size={25}/>
          <span className={styles.navLinksText}>Ingresar</span>
        </Link>

        <Link href={"/"} className={styles.navLinks}>
          <IoLogOutOutline className={styles.navIcon} size={25}/>
          <span className={styles.navLinksText}>Salir</span>
        </Link>

        <div className={styles.navMidLine}/>

        <Link href={"/"} className={styles.navLinks}>
          <IoShirtOutline className={styles.navIcon} size={25}/>
          <span className={styles.navLinksText}>Productos</span>
        </Link>

        <Link href={"/"} className={styles.navLinks}>
          <IoTicketOutline className={styles.navIcon} size={25}/>
          <span className={styles.navLinksText}>Órdenes</span>
        </Link>

        <Link href={"/"} className={styles.navLinks}>
          <IoPeopleOutline className={styles.navIcon} size={25}/>
          <span className={styles.navLinksText}>Usuarios</span>
        </Link>

      </nav>
    </div>
  );
};
