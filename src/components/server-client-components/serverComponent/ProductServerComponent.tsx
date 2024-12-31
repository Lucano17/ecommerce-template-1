// product-server-component.tsx (Componente del servidor)
import { getProductBySlug } from "@/actions";// Esta es tu función del servidor
import { ProductClientComponent } from "./ProductClientComponent";

export const ProductServerComponent = async ({ slug }: { slug: string }) => {
  const product = await getProductBySlug(slug);
  if (!product) {
    return null;
  }

  return <ProductClientComponent product={product} />;
};
