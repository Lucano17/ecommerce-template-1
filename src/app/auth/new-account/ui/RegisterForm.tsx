"use client";

import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";
import { login, registerUser } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message || "Ha ocurrido un error");
      return;
    }

    await login(email.toLowerCase(), password)
    window.location.replace("/")
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h1>Nueva cuenta</h1>

        <label htmlFor="name">Nombre completo</label>
        <input
          placeholder="Juan Pérez"
          type="text"
          {...register("name", { required: true, minLength: 6 })}
          autoFocus
          className={`${styles.input} ${
            errors.name ? styles.formErrorFocus : ""
          }`}
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          placeholder="juan.perez@gmail.com"
          type="email"
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
            minLength: 6,
          })}
          className={`${styles.input} ${
            errors.email ? styles.formErrorFocus : ""
          }`}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          placeholder="**********"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className={`${styles.input} ${
            errors.password ? styles.formErrorFocus : ""
          }`}
        />

        <div className={styles.errorContainer}>
          {(errors.name || errors.email || errors.password)?.type ===
            "required" && (
            <p className={styles.formError}>
              <IoInformationCircleOutline className={styles.errorIcon} />
              Las credenciales son necesarias
            </p>
          )}

          {errors.email?.type === "pattern" && (
            <p className={styles.formError}>
              <IoInformationCircleOutline className={styles.errorIcon} />
              Verifica el formato de tu correo
            </p>
          )}

          {(errors.name || errors.email || errors.password)?.type ===
            "minLength" && (
            <p className={styles.formError}>
              <IoInformationCircleOutline className={styles.errorIcon} />
              Las credenciales deben tener al menos 6 carácteres
            </p>
          )}

          {
            errorMessage && (
              <p className={styles.formError}>
              <IoInformationCircleOutline className={styles.errorIcon} />
              {errorMessage}
            </p>
            )
          }
        </div>
        <button>Registrarse</button>
      </form>

      <p className={styles.p}>Si ya tienes una cuenta</p>
      <Link href="/auth/login" className={styles.loginLink}>
        Ingresa
      </Link>
    </div>
  );
};
