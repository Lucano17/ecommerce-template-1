import Image from "next/image";
import styles from "./page.module.css";
import { titleFont } from "../../fonts/fonts";

export default function Auth() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <h1>Auth page</h1>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}
