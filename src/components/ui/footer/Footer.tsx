import Link from "next/link";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
        <div>

      <Link href="/">
        <span>Teslo</span>
        <span> | Shop</span>
        <span> © {new Date().getFullYear()}</span>
      </Link>
        </div>
      <div className={styles.columnRight}>
        <p>
          Sitio web realizado por <span>Lucas de la Fuente</span>
        </p>
        <Link
          href="https://earnest-croissant-d12ab3.netlify.app/"
          className={styles.contactButton}
          target="_blank"
        >
          Contáctame
        </Link>
      </div>
    </div>
  );
};

export default Footer;
