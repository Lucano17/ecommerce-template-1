"use client"

import React from "react";
import styles from "./RegisterForm.module.css";
import Link from "next/link";

export const RegisterForm = () => {
  return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1>Nueva cuenta</h1>

          <label htmlFor="name">Nombre completo</label>
          <input placeholder="Juan Pérez" type="text" />

          <label htmlFor="email">Correo electrónico</label>
          <input placeholder="juan.perez@gmail.com" type="email" />

          <label htmlFor="password">Contraseña</label>
          <input placeholder="**********" type="password" />

          <button>Registrarse</button>

          {/* divisor l ine */}
        </div>
        <p className={styles.p}>Si ya tienes una cuenta</p>
        <Link href="/auth/login" className={styles.loginLink}>
          Ingresa
        </Link>
      </div>
  );
};
