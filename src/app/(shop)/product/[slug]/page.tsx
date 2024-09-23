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
      <div className={styles.imagesContainer}>
        <ProductSlideShow
        title={product.title}
        images={product.images}/>
      </div>

      <div className={styles.dataContainer}>
        <h1>{product?.title}</h1>

        <p>${product?.price}</p>

        <div>
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        </div>

        <div>
        <QuantitySelector
        quantity={1}/>
        </div>

        <button
        className={styles.CartButton}>Agregar al carrito</button>

        <h3>Descripción</h3>

        <p
        className={styles.descriptionText}>{product?.description}</p>
      </div>
    </div>
  );
}
