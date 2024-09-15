import React from "react";
import Link from "next/link";
import styles from "./PageNotFound.module.css"
import Image from "next/image";
import notFoundImage from "@/public/imgs/starman_750x750.png"

export const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404 Not found</h1>
      <p>Lo sentimos mucho!</p>
      <p>Regresa al inicio para seguir disfrutando de nuestros productos!</p>
      <Link className={styles.returnButton} href="/">Regresar</Link>
      <div>
        <Image className={styles.notFoundImage}
        src={notFoundImage}
        alt="Not found image"
        width={300}
        height={300}/>
      </div>
    </div>
  );
};
