// product-server-component.tsx (Componente del servidor)
import { getProductBySlug } from "@/actions";// Esta es tu función del servidor
import { ProductClientComponent } from "./ProductClientComponent";

export const ProductServerComponent = async ({ slug }: { slug: string }) => {
  const product = await getProductBySlug(slug);
  if (!product) {
    // Si no encuentras el producto, podrías redirigir a una página 404 o similar
    return null;
  }

  return <ProductClientComponent product={product} />;
};
