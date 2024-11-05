import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";




export default function PaymentPage() {
  // redirect("/empty")

  return (
    <div className={styles.container}>
      <Title title="Payment" />
        
    </div>
  );
}
