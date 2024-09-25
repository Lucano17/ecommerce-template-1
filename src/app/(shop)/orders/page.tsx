import { Title } from '@/components';

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import styles from "./page.module.css"

export default function() {
  return (
    <>
      <Title title="Orders" />

      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>
                #ID
              </th>
              <th>
                Nombre completo
              </th>
              <th>
                Estado
              </th>
              <th>
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>

            <tr>

              <td>1</td>
              <td>
                Mark
              </td>
              <td>

                <IoCardOutline className={styles.hola}/>
                <span>Pagada</span>

              </td>
              <td>
                <Link href="/orders/123">
                  Ver orden
                </Link>
              </td>

            </tr>

            <tr>

              <td>1</td>
              <td>
                Mark
              </td>
              <td>

                <IoCardOutline className="text-red-800" />
                <span>No Pagada</span>

              </td>
              <td>
                <Link href="/orders/123">
                  Ver orden
                </Link>
              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </>
  );
}