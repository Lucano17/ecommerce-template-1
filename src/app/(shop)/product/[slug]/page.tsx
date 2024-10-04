// page.tsx (Página del servidor)
import { ProductServerComponent } from "@/components/server-client-components/server-component/product-server-component";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;

  // Usamos un componente del servidor para obtener el producto y pasarlo al cliente
  return <ProductServerComponent slug={slug} />;
}
