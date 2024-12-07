import { notFound, redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import styles from "./page.module.css";
import prisma from "@/lib/prisma";

export const revalidate = 60;

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function TypeByIdPage({ params, searchParams }: Props) {
  const { category } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const existingCategory = await prisma.category.findUnique({
    where: { name: category },
  });

  if (!existingCategory) {
    notFound();
  }

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    category,
  });

  if (products.length === 0) {
    redirect("/category");
  }

  return (
    <div className={styles.container}>
      <Title title={`Categoría: ${category}`} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
