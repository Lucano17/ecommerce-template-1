import { titleFont } from '@/fonts/fonts';
import Link from 'next/link';
import styles from "./page.module.css"

export default function () {
  return (
    <main>
      <div className={styles.container}>

      

      <div className={styles.formContainer}>
      <h1>Ingresar</h1>

        <label htmlFor="email">Correo electrónico</label>
        <input
          placeholder='juan.perez@gmail.com'
          type="email" />


        <label htmlFor="email">Contraseña</label>
        <input
          placeholder='**********'
          type="email" />

        <button
          >
          Ingresar
        </button>


        {/* divisor l ine */ }

        

      </div>
      <Link
          href="/auth/new-account" 
          className={styles.registerLink}>
          Crear una nueva cuenta
        </Link>
      </div>
    </main>
  );
}