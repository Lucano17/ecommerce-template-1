import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import ProductsGridCheckout from "@/components/products/product-grid-checkout/ProductsGridCheckout";

export default function () {
  return (
    <div className={styles.container}>
      <Title title="Verificar orden" />
      <div className={styles.carritoContainer}>
        <div className={styles.carrito}>
          <Link href="/cart" className={styles.comeBack}>
            Editar carrito
          </Link>
          <ProductsGridCheckout />
        </div>

        <div className={styles.checkOut}>
          <div className={styles.address}>
            <h2>Dirección de entrega</h2>
            <h3>Lucas de la Fuente</h3>
            <p>Buenos Aires, Argentina</p>
            <p>Del Viso</p>
            <p>CP: 1669</p>
            <p>Juan XXIII 5250</p>
          </div>

          <div className={styles.order}>

            <h2>Resumen de orden</h2>
            <p>Número de productos <span>3</span></p>
            <p>Subtotal <span>$150</span></p>
            <p>Impuestos (21%)<span></span></p>
            <p>Envío <span>$50</span></p>

            <div className={styles.spacer} />
            <p className={styles.totalPrice}>Total <span>$500</span></p>
            
          </div>

            <div className={styles.goToOrder}>
                <Link href="/orders/123">Colocar orden</Link>
            </div>

        </div>
      </div>
    </div>
  );
}
