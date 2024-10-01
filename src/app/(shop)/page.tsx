import { ProductGrid, Title } from "@/components";
// import { initialData } from "@/seed/seed";
import styles from "./page.module.css"
import { getPaginatedProductsWithImages } from "@/actions";

// const products = initialData.products;

export default async function Shop() {

  const {products} = await getPaginatedProductsWithImages()


  return (
    <>
      <Title className={styles.title} title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products}/>
    </>
  );
}
