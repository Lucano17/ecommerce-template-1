import { Title } from "@/components";
import styles from "./page.module.css";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function AddressPage() {
  const countries = await getCountries()

  const session = await auth()

  if (!session?.user) {
    return (
      <h3>No hay sesión de usuario</h3>
    )
  }

  const userAddress = await getUserAddress(session.user.id) ?? undefined

  return (
    <div className={styles.container}>
      <div>
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoreAddress={userAddress}/>
      </div>
    </div>
  );
}
