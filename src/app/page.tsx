import Image from "next/image";
import styles from "./page.module.css";
import { titleFont } from "../fonts/fonts";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hola mundo</h1>
        <h1 className={titleFont.className}>Hola mundo</h1>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
