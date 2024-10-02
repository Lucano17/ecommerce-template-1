import { titleFont } from '@/fonts/fonts';
import Link from 'next/link';
import styles from "./page.module.css"

export default function NewAccountPage() {
  return (
    <main>
      <div className={styles.container}>

      

      <div className={styles.formContainer}>
      <h1>Nueva cuenta</h1>


      <label htmlFor="name">Nombre completo</label>
        <input
          placeholder='Juan Pérez'
          type="text" />

        <label htmlFor="email">Correo electrónico</label>
        <input
          placeholder='juan.perez@gmail.com'
          type="email" />


        <label htmlFor="password">Contraseña</label>
        <input
          placeholder='**********'
          type="password" />

        <button
          >
          Registrarse
        </button>


        {/* divisor l ine */ }

        

      </div>
      <p className={styles.p}>Si ya tienes una cuenta</p>
      <Link
          href="/auth/login" 
          className={styles.registerLink}>
          Ingresa
        </Link>
      </div>
    </main>
  );
}