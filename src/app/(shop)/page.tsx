import { ProductGrid, Title } from "@/components";
// import { initialData } from "@/seed/seed";
import styles from "./page.module.css";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

// const products = initialData.products;

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Shop({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({page});

  if (products.length === 0) {
    redirect("/")
  }

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
