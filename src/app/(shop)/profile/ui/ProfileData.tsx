import React from "react";
import { auth, authConfig } from "@/auth.config";
import { redirect } from "next/navigation";
import styles from "./ProfileData.module.css";
import { userUpdate } from "@/actions/auth/update-user";
import { FaEdit } from "react-icons/fa";

interface Props {
  email: string;
  name: string;
  password: string;
};

export const ProfileData = async ({ email, name, password}: Props) => {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil')
    redirect("/");
  }

  const handleUpdateUser = async (newEmail: string, newName: string, newPassword: string) => {
    await userUpdate(newEmail, newName, newPassword);
  };

  return (
    <div className={styles.container}>
      {/* <input type="image" className={styles.image} /> */}

      <div className={styles.singleDataContainer}>
        <h3>Correo electrónico:</h3>
      <div className={styles.userData}>
      <p>{session.user.email}</p>
      <button><FaEdit/></button>
      </div>
      </div>

      <div className={styles.singleDataContainer}>
        <h3>Nombre de usuario:</h3>
      <div className={styles.userData}>
      <p>{session.user.name}</p>
      <button><FaEdit/></button>
      </div>
      </div>

      <div className={styles.singleDataContainer}>
        <h3>Contraseña:</h3>
      <div className={styles.userData}>
      <p>Cambiar contraseña</p>
      <button><FaEdit/></button>
      </div>
      </div>

      <div className={styles.singleDataContainer}>
        <h3>Rol de usuario:</h3>
      <div className={styles.userData}>
      <p>{session.user.role}</p>
      </div>
      </div>

    </div>
  );
};
