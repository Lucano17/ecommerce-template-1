import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { ProductsGridCart } from "@/components";
import { redirect } from "next/navigation";




export default function CartPage() {
  // redirect("/empty")

  return (
    <div className={styles.container}>
      <Title title="Carrito" />
      <div className={styles.carritoContainer}>

        <div className={styles.carrito}>
          <ProductsGridCart />
          <Link href="/" className={styles.keepShoping}>Continúa comprando</Link>
        </div>

        <div className={styles.checkOut}>
          <h2>Resumen de orden</h2>
          <p>Número de productos <span>3</span></p>
          <p>Subtotal <span>$150</span></p>
          <p>Impuestos (21%)<span></span></p>
          <p>Envío <span>$50</span></p>
          <div className={styles.spacer}/>
          <p className={styles.totalPrice}>Total <span>$500</span></p>
          <div className={styles.goToOrder}>
                <Link href="/checkout/address">Checkout</Link>
            </div>
        </div>

      </div>

    </div>
  );
}
