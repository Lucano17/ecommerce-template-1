import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";
import { Product, Category } from '@/interfaces';

const seedProducts = initialData.products;
interface Props {
  params: {
    id: Category;
  };
  products: {
    products: Product
  }
}

export default function ({ params}: Props) {
  const { id } = params;
  const products = seedProducts.filter(product =>product.gender === id)
  const labels = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "Niños",
    "unisex": "todos"
  }

  if (id !== "men" && id !== "women" && id !== "kid") {
    notFound();
  }
  return (
    <div>
      <Title title={`Indumentaria para ${labels[id]}`} />
      <ProductGrid products={products}/>
    </div>
  );
}
