import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { AddressForm } from "./ui/AddressForm";

export default function AddressPage() {
  return (
    <div className={styles.container}>
      <div>
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm/>
      </div>
    </div>
  );
}
