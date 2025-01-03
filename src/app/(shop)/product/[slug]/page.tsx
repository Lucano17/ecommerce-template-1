// page.tsx (Página del servidor)
import { getProductBySlug } from "@/actions";
import { ProductServerComponent } from "@/components/server-client-components/serverComponent/ProductServerComponent";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;

  // Use server component to obtain the product and send it to the client
  return <ProductServerComponent slug={slug} />;
}
