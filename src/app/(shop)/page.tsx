import { ProductGrid, Title, Pagination } from "@/components";
import styles from "./page.module.css";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";
import AlertMessage from "@/components/ui/alert/AlertMessage";

export const revalidate = 60;

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <div className={styles.container}>

        <AlertMessage alertMessage="RECUERDA QUE ESTA ES UNA TIENDA DE PRUEBA. 
        Por favor, utiliza cuentas de prueba para realizar los pagos"/>

        <Title
          className={styles.title}
          title="Tienda"
          subtitle="Todos los productos"
        />
        <ProductGrid products={products} />
      </div>
      <div className={styles.pagination}>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
