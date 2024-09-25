"use client"
import { IsPaid, Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";

export default function () {
    const [isPaid, setIsPaid] = useState(false);

    const handleStateChange = () => {
      setIsPaid((isPaid) => !isPaid); // Cambia el estado de isPaid
    };
  return (
    <>
      <Title title="Orders" />

      <div className={styles.container}>
        <button onClick={handleStateChange}>Cambiar estado</button>
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
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>
                <div className={styles.state}>
                  <IsPaid isPaid={isPaid}/>
                </div>
              </td>
              <td>
                <Link href="/orders/123">Ver orden</Link>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>Mark</td>

              <td>
                <div className={styles.state}>
                <IsPaid isPaid={isPaid}/>
                </div>
              </td>

              <td>
                <Link href="/orders/123">Ver orden</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
