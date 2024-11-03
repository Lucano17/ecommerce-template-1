import { IsPaid, Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { getOrdersByUser } from "@/actions";
import { redirect } from "next/navigation";


interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersPage({ params }: Props) {
  const { ok, orders } = await getOrdersByUser();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Orders" />
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Nombre completo</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <>
                <tr key={order.id}>
                  <td>{order.id.split("-").at(-1)}</td>
                  <td>{order.OrderAddress?.lastName}, {order.OrderAddress?.firstName}</td>
                  <td className={styles.tdContainer}>
                    {
                      order.isPaid
                      ? (
                        <span className={styles.state}><IsPaid params={params}/></span>
                      )
                      : (
                        <span className={styles.state}><IsPaid params={params}/></span>
                      )
                    }
                  </td>
                  <td>
                    <Link href={`/orders/${order.id}`}>Ver orden</Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
