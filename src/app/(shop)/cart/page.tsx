import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import ProductsGridCart from "@/components/products/product-grid-cart/ProductsGridCart";

export default function () {
  return (
    <div className={styles.container}>
      <Title title="Carrito" />

      <div className={styles.carritoContainer}>

        <div className={styles.carrito}>
          <Link href="/">Continúa comprando</Link>
          <ProductsGridCart />
        </div>

        <div>
          <h2>Resumen de orden</h2>
        </div>

      </div>

    </div>
  );
}
