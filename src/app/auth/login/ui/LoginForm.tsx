
"use client";

import React, { useState } from "react";
import { authenticate } from "@/actions";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget); // Recolecta los datos del formulario
    const result = await authenticate(formData); // Llama a la Server Action

    if (result?.error) {
      setErrorMessage(result.error); // Muestra el mensaje de error si ocurre
    } else {
      setErrorMessage(null); // Limpia los errores si todo está bien
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Ingresar</h1>

        <label htmlFor="email">Correo electrónico</label>
        <input placeholder="juan.perez@gmail.com" type="email" name="email" />

        <label htmlFor="password">Contraseña</label>
        <input placeholder="**********" type="password" name="password" />

        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" disabled={isPending}>
          {isPending ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </form>
  );
};
