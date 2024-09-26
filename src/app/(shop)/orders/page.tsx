"use client"
import { IsPaid, Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";

export default function () {
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
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>
                <div className={styles.state}>
                <IsPaid/>
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
                <IsPaid/>
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
