"use client";

import Link from "next/link";
import React from "react";
import styles from "./AddressForm.module.css";

export const AddressForm = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <span>Nombres</span>
        <input type="text" />
      </div>

      <div className={styles.inputContainer}>
        <span>Apellidos</span>
        <input type="text" />
      </div>

      <div className={styles.inputContainer}>
        <span>Dirección</span>
        <input type="text" />
      </div>

      <div className={styles.inputContainer}>
        <span>Dirección 2 (opcional)</span>
        <input type="text" />
      </div>

      <div className={styles.inputContainer}>
        <span>Código postal</span>
        <input type="text" />
      </div>

      <div className={styles.inputContainer}>
        <span>Ciudad</span>
        <input type="text" />
      </div>

      <div className={styles.inputContainer}>
        <span>País</span>
        <select>
          <option value="">[ Seleccione ]</option>
          <option value="CRI">Argentina</option>
        </select>
      </div>

      <div className={styles.inputContainer}>
        <span>Teléfono</span>
        <input type="text" />
      </div>

      <div className={styles.checkboxContainer}>
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            className={styles.checkbox}
            //   checked
          />
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <p>¿Recordar dirección?</p>
       
      </div>

      <div className={styles.inputContainer}>
        <Link href="/checkout">Siguiente</Link>
      </div>
    </div>
  );
};
