"use client"
import { Title, PayPalButton } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";




export default function PaymentPage() {

  return (
    <div className={styles.container}>
      <Title title="Payment" />
        <PayPalButton/>
    </div>
  );
}
