"use client"

import React from 'react'
import styles from "./LoginForm.module.css"
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { authenticate } from '@/actions'
import { object } from 'zod'
import { IoInformation, IoInformationOutline } from 'react-icons/io5'

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className={styles.container}>

      

      <div className={styles.formContainer}>
      <h1>Ingresar</h1>

        <label htmlFor="email">Correo electrónico</label>
        <input
          placeholder='juan.perez@gmail.com'
          type="email"
          name="email" />


        <label htmlFor="password">Contraseña</label>
        <input
          placeholder='**********'
          type="password"
          name="password" />

        {state === "CredentialsSignin" && (
            <>
            <div>
            <IoInformationOutline/>
            <p>Las credenciales no son correctas</p>
            </div>
            </>
          )}

        <button type='submit'
          >
          Ingresar
        </button>

        

      </div>
      <Link
          href="/auth/new-account" 
          className={styles.registerLink}>
          Crear una nueva cuenta
        </Link>
      </form>
  )
}
