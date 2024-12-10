import { IsPaid, Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { getOrdersByUser } from "@/actions";
import { redirect } from "next/navigation";


export default async function OrdersPage() {
  const { ok, orders } = await getOrdersByUser();

  if (!ok || !orders) {
    redirect("/auth/login");
  }

  if (!orders || orders.length === 0) {
    return <p>Todavía no tienes ninguna orden. Visita nuestra tienda!</p>;
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
                <tr key={order.id}>
                  <td>{order.id.split("-").at(-1)}</td>
                  <td>{order.OrderAddress?.lastName}, {order.OrderAddress?.firstName}</td>
                  <td className={styles.tdContainer}>
                    <span className={styles.state}><IsPaid id={order.id}/></span>
                  </td>
                  <td>
                    <Link href={`/orders/${order.id}`}>Ver orden</Link>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
