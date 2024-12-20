"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions";
import { IoInformationCircleOutline } from "react-icons/io5";
import styles from "./LoginForm.module.css";
import Link from "next/link";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/");
    }
  }, [state]);

  return (
    <>
      <form action={dispatch} className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Ingresar</h1>

          <label htmlFor="email">Correo electrónico</label>
          <input placeholder="juan.perez@gmail.com" type="email" name="email" />

          <label htmlFor="password">Contraseña</label>
          <input placeholder="**********" type="password" name="password" />
          {state === "CredentialsSignin" && (
            <div className={styles.credentialsError}>
              <IoInformationCircleOutline />
              <p>Las credenciales no son correctas</p>
            </div>
          )}
          <LoginButton />
        </div>
      </form>
        <p className={styles.p}>Si no tienes una cuenta, regístrate en el siguiente enlace</p>
        <Link href="/auth/new-account" className={styles.registerLink}>
          Crear una nueva cuenta
        </Link>
    </>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Ingresando..." : "Ingresar"}
    </button>
  );
}
