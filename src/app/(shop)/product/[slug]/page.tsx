import styles from "./page.module.css";
import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import { ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";

interface Props {
  params: {
    slug: string;
  };
}

export default function ({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find(product => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.item1}>
        <h1>Product Page</h1>
        <ProductSlideShow
        title={product.title}
        images={product.images}/>
      </div>

      <div className={styles.item2}>
        <h1>{product?.title}</h1>

        <p>${product?.price}</p>

        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        <QuantitySelector
        quantity={1}/>

        <button>Agregar al carrito</button>

        <h3>Descripción</h3>

        <p>{product?.description}</p>
      </div>
    </div>
  );
}
