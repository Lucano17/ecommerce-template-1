// import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import styles from "./ProductsGridCheckout.module.css";
// import { FaTrashAlt } from "react-icons/fa";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function () {
  return (
    <div className={styles.container}>
      {productsInCart.map((product) => (
        <div key={product.slug} className={styles.productsContainer}>
          <Image
            src={`/products/${product.images[0]}`}
            width={50}
            height={50}
            alt={product.title}
          />

          <div>
            <p className={styles.title}>{product.title}</p>

            <div className={styles.priceAndQuantity}>
              <p className={styles.price}>${product.price} x3u. =</p>
              <p className={styles.subtotalArticle}>${product.price * 3}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
