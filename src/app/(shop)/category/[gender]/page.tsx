import { notFound, redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";
import styles from "./page.module.css"

export const revalidate = 60
interface Props {
  params: {
    gender: string; // sino Type Category
  };
  searchParams: {
      page?: string;
    };
  }


export default async function GenderByIdPage({ params, searchParams}: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender});

  if (products.length === 0) {
    redirect(`/category/${gender}`)
  }
  // const products = seedProducts.filter(product =>product.gender === id) ESTO ES CON LA SEED INICIAL
  const labels: Record<string, string> = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "Niños",
    "unisex": "todos"
  }

  if (gender !== "men" && gender !== "women" && gender !== "kid") {
    notFound();
  }
  return (
    <div className={styles.container}>
      <Title title={`Indumentaria para ${labels[gender]}`} />
      <ProductGrid products={products}/>
      <Pagination totalPages={totalPages}/>
    </div>
  );
}
