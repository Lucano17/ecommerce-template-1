import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";

export default function AddressPage() {
  return (
    <div className={styles.container}>
      <div>
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <div className={styles.formContainer}>
            
          <div className={styles.inputContainer}>
            <span>Nombres</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <span>Apellidos</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <span>Dirección</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <span>Dirección 2 (opcional)</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <span>Código postal</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <span>Ciudad</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <span>País</span>
            <select>
              <option value="">[ Seleccione ]</option>
              <option value="CRI">Argentina</option>
            </select>
          </div>

          <div className={styles.inputContainer}>
            <span>Teléfono</span>
            <input type="text" />
          </div>

          <div className={styles.inputContainer}>
            <Link href="/checkout">Siguiente</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
