import { auth, authConfig } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";
import styles from "./page.module.css"

export default async function ProfilePage () {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <Title title="Perfil" />

      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
      <input type="image"  className={styles.image}/>
      <h3>Usuario: <span>{session.user.name}</span></h3>
      <h3>Correo electrónico: <span>{session.user.email}</span></h3>
      <h3>Rol: <span>{session.user.role}</span></h3>
      <h3>Contraseña: <span>*********</span></h3>
    </div>
  );
};
