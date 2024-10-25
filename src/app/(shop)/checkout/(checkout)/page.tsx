import { PlaceOrder, Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import ProductsInCheckout from "@/components/products/product-grid-checkout/ProductsInCheckout";

export default function CheckoutPage() {
  return (
    <div className={styles.container}>
      <Title title="Verificar orden" />
      <div className={styles.carritoContainer}>
        <div className={styles.carrito}>
          <Link href="/cart" className={styles.comeBack}>
            Editar carrito
          </Link>
          <ProductsInCheckout />
        </div>
        <PlaceOrder/>
      </div>
    </div>
  );
}
