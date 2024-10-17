"use client";

import React from "react";
import styles from "./RegisterForm.module.css";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoInformationCircleOutline } from "react-icons/io5";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <h1>Nueva cuenta</h1>

        <label htmlFor="name">Nombre completo</label>
        <input
          placeholder="Juan Pérez"
          type="text"
          {...register("name", { required: true })}
          autoFocus
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          placeholder="juan.perez@gmail.com"
          type="email"
          {...register("email", { required: true })}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          placeholder="**********"
          type="password"
          {...register("password", { required: true })}
        />

        {errors.name?.type === "required" && (
          <p className={styles.formError}>
            <IoInformationCircleOutline className={styles.errorIcon} /> El
            nombre es obligatorio
          </p>
        )}

        <button>Registrarse</button>

        {/* divisor l ine */}
      </form>
      <p className={styles.p}>Si ya tienes una cuenta</p>
      <Link href="/auth/login" className={styles.loginLink}>
        Ingresa
      </Link>
    </div>
  );
};
