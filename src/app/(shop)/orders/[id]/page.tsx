import { IsPaid, Title } from "@/components";
import styles from "./page.module.css";
import { ProductsInCheckout } from "@/components";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { UserAddressData } from "@/components";
import { currencyFormat } from "@/utils";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <Title title={`Orden #${id.split("-").at(-1)}`} />
      <div className={styles.carritoContainer}>
        <div className={styles.carrito}>
          <span className={styles.state}>
            <IsPaid id={id} />
          </span>
          <ProductsInCheckout params={params} />
        </div>

        <div className={styles.checkOut}>
          <UserAddressData params={params} />

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

            {order?.isPaid ? (
              <Link href={`/checkout/shipping/${id}`}>Detalles del envío</Link>
            ) : (
              <Link href={`/checkout/payment/${id}`}>PAGAR</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
