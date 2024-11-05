
import { IsPaid, Title } from "@/components";
import styles from "./page.module.css";
import ProductsGridCheckout from "@/components/products/product-grid-checkout/ProductsInCheckout";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { UserAddressData } from "@/components/address/UserAddressData";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/")
  }

  return (
    <div className={styles.container}>
      <Title title={`Orden #${id.split("-").at(-1)}`} />
      <div className={styles.carritoContainer}>
        <div className={styles.carrito}>
          <span className={styles.state}><IsPaid id={id}/></span>

          <ProductsGridCheckout params={params}/>
        </div>

        <div className={styles.checkOut}>
          <UserAddressData params={params}/>

          <div className={styles.order}>
            <h2>Resumen de orden</h2>
            <p>
              Número de productos <span>{order?.itemsInOrder}</span>
            </p>
            <p>
              Subtotal <span>{currencyFormat(order!.subtotal)}</span>
            </p>
            <p>
              Impuestos (21%)<span>{currencyFormat(order!.tax)}</span>
            </p>
            <p>
              Envío <span>$50</span>
            </p>

            <div className={styles.spacer} />
            <p className={styles.totalPrice}>
              Total <span>{currencyFormat(order!.total)}</span>
            </p>
            <button>PAGAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
