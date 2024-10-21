import React from "react";
import { auth, authConfig } from "@/auth.config";
import { redirect } from "next/navigation";
import styles from "../page.module.css";
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
    <div>
      <input type="image" className={styles.image} />

      <div>
        <h3>Correo electrónico:</h3>
      <div>
      <p>{session.user.email}</p>
      <FaEdit/>
      </div>
      </div>

      <div>
        <h3>Nombre de usuario:</h3>
      <div>
      <p>{session.user.name}</p>
      <FaEdit/>
      </div>
      </div>

      <div>
        <h3>Contraseña:</h3>
      <div>
      <p>Cambiar contraseña</p>
      <FaEdit/>
      </div>
      </div>

      <div>
        <h3>Rol de usuario:</h3>
      <div>
      <p>{session.user.role}</p>
      </div>
      </div>

    </div>
  );
};
