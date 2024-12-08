import { ProductGrid, Title, Pagination, Filter } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";
import AlertMessage from "@/components/ui/alert/AlertMessage";

interface Props {
  searchParams: {
    page?: string;
    sortBy?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const sortBy = searchParams.sortBy || "price_asc";  // Valor por defecto

  // Obtenemos los productos filtrados y paginados desde el servidor
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    sortBy,
  });

  if (products.length === 0) {
    return <AlertMessage alertMessage="No hay productos disponibles." />;
  }

  return (
    <>
      <div>
        <AlertMessage alertMessage="RECUERDA QUE ESTA ES UNA TIENDA DE PRUEBA." />
        
        <Title title="Tienda" subtitle="Todos los productos" />
        
        {/* Filter maneja el estado de los filtros en el lado del cliente */}
        <Filter />
        <ProductGrid products={products} />
      </div>

      <div>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
