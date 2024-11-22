import { IsPaid, Title } from "@/components";
import Link from "next/link";
import { getPaginatedOrders, getPaginatedUsers } from "@/actions";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import { UsersTable } from "./ui/UsersTable";
import { User } from "@/interfaces";




export default async function UsersManagmentPage() {
  const {ok, users = []} = await getPaginatedUsers()

  if (!ok) {
    redirect("/auth/login");
  }

  if (!users || users.length === 0) {
    return <p>Todavía tienes ningún usuario registrado</p>;
  }

  return (
    <>
      <Title title="Lista de usuarios" />
      <div className={styles.container}>
        <UsersTable users={users}/>
      </div>
    </>
  );
}
