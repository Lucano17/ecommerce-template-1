import { ProductGrid, Title } from "@/components";
// import { initialData } from "@/seed/seed";
import styles from "./page.module.css";
import { getPaginatedProductsWithImages } from "@/actions";

// const products = initialData.products;

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Shop({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({page});

  return (
    <>
      <Title
        className={styles.title}
        title="Tienda"
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
    </>
  );
}
