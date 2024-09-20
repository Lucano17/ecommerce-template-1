import styles from "./page.module.css"
import { initialData } from "@/seed/seed";
import notFound from "../not-found";


interface Props {
    params: {
        slug: string;
    }
}

export default function ({params}: Props) {
    const { slug } = params;
    const product = initialData.products.find(product => product.slug === slug);

    if (!product) {
        notFound();
    }



    return (
        <div className={styles.container}>
            
            <div className={styles.item1}>
            <h1>Product Page</h1>
            </div>

            <div className={styles.item2}>
                <h1>{product?.title}</h1>
                <p>${product?.price}</p>
                <button>Agregar al carrito</button>
                <h3>Descripción</h3>
                <p>
                    {product?.description}
                </p>
            </div>
            
        </div>
    )
}