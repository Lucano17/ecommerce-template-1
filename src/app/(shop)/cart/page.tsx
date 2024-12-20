import { OrderSummary, Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { ProductsInCart } from "@/components";




export default function CartPage() {
  // redirect("/empty")

  return (
    <div className={styles.container}>
      <Title title="Carrito" />
      <div className={styles.carritoContainer}>

        <div className={styles.carrito}>
          <ProductsInCart />
          <Link href="/" className={styles.keepShoping}>Continúa comprando</Link>
        </div>
        
        <OrderSummary/>

      </div>

    </div>
  );
}
