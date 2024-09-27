import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import styles from "./page.module.css"

const products = initialData.products;

export default function Shop() {
  return (
    <>
      <Title className={styles.title} title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products}/>
    </>
  );
}
