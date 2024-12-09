import { notFound, redirect } from "next/navigation";
import { Filter, Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";
import styles from "./page.module.css";

export const revalidate = 60;

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
    sortBy?: string;
  };
}

export default async function GendersByIdPage({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const sortBy = searchParams.sortBy || "price_asc";  // Valor por defecto

  if (!Object.values(Gender).includes(gender as Gender)) {
    notFound();
  }

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    sortBy,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect("/gender");
  }

  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Todos",
  };

  return (
    <div className={styles.container}>
      <Title title={`Indumentaria para ${labels[gender]}`} />
      <Filter />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}