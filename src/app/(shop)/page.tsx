import { ProductGrid, Title, Pagination } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import AlertMessage from "@/components/ui/alert/AlertMessage";
import styles from "./page.module.css"

interface Props {
  searchParams: {
    page?: string;
    sortBy?: string;
    q?: string
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const sortBy = searchParams.sortBy || "price_asc";  // Valor por defecto
  const query = searchParams.q || "";

  // Obtenemos los productos filtrados y paginados desde el servidor
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    sortBy,
    query,
  });

  if (products.length === 0) {
    return <AlertMessage alertMessage="No hay productos disponibles." />;
  }

  return (
    <>
      <div className={styles.container}>
        <AlertMessage alertMessage="RECUERDA QUE ESTA ES UNA TIENDA DE PRUEBA." />
        
        <Title title="Tienda" subtitle="Todos los productos" />



        <ProductGrid products={products} searchParams={searchParams}/>
      </div>

      <div className={styles.pagination}>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
