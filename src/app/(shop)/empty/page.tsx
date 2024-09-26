import Link from "next/link";
import React from "react";
import { IoCartOutline } from "react-icons/io5";
import styles from "./page.module.css"

export default function () {
  return (
    <div>
      <IoCartOutline size={80} />
      <div>
        <h1>Tu carrito está vacío</h1>
        <Link href="/">Regresar</Link>
      </div>
    </div>
  );
};
