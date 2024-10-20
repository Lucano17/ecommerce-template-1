import { Title } from "@/components";
import Link from "next/link";
import styles from "./page.module.css";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions";

export default async function AddressPage() {
  const countries = await getCountries()
  return (
    <div className={styles.container}>
      <div>
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries}/>
      </div>
    </div>
  );
}
