"use client";

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
import { useUIStore } from "@/store";
import { logout } from "@/actions";

export const SideBar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {isSideMenuOpen && <div className={styles.blackBackground}></div>}
      {isSideMenuOpen && (
        <div className={styles.blurBackground} onClick={closeSideMenu}></div>
      )}

      <div>
        {isSideMenuOpen && (
          <nav className={styles.sideBar}>
            <IoCloseOutline
              className={styles.closeIcon}
              onClick={()=> closeSideMenu()}
            />
            <div className={styles.searchContainer}>
              <IoSearchOutline className={styles.searchIcon} size={20} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Buscar"
              />
            </div>

            <Link
              href={"/profile"}
              className={styles.navLinks}
              onClick={()=> closeSideMenu()}
            >
              <IoPersonOutline className={styles.navIcon} size={25} />
              <span className={styles.navLinksText}>Perfil</span>
            </Link>

            <Link href={"/orders"} className={styles.navLinks} onClick={()=> closeSideMenu()}>
              <IoTicketOutline className={styles.navIcon} size={25} />
              <span className={styles.navLinksText}>Orders</span>
            </Link>

            <Link href={"/auth/login"} className={styles.navLinks} onClick={()=> closeSideMenu()}>
              <IoLogInOutline className={styles.navIcon} size={25} />
              <span className={styles.navLinksText}>Ingresar</span>
            </Link>

            <button
            className={styles.authButton}
            onClick={() => {logout(), closeSideMenu()}}>
              <IoLogOutOutline className={styles.navIcon} size={25} />
              <span className={styles.authText}>Salir</span>
            </button>

            <div className={styles.navMidLine} />

            <Link href={"/"} className={styles.navLinks} onClick={()=> closeSideMenu()}>
              <IoShirtOutline className={styles.navIcon} size={25} />
              <span className={styles.navLinksText}>Productos</span>
            </Link>

            <Link href={"/orders"} className={styles.navLinks} onClick={()=> closeSideMenu()}>
              <IoTicketOutline className={styles.navIcon} size={25} />
              <span className={styles.navLinksText}>Órdenes</span>
            </Link>

            <Link href={"/"} className={styles.navLinks} onClick={()=> closeSideMenu()}>
              <IoPeopleOutline className={styles.navIcon} size={25} />
              <span className={styles.navLinksText}>Usuarios</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};
