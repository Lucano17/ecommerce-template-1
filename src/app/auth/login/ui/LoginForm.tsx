"use client"

import React from 'react'
import styles from "./LoginForm.module.css"
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { authenticate } from '@/actions'
import { object } from 'zod'

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined)
    

    console.log(state) //TODO: Remove this console.log

  return (
    <form action={dispatch} className={styles.container}>

      

      <div className={styles.formContainer}>
      <h1>Ingresar</h1>

        <label htmlFor="email">Correo electrónico</label>
        <input
          placeholder='juan.perez@gmail.com'
          type="email"
          name='email' />


        <label htmlFor="password">Contraseña</label>
        <input
          placeholder='**********'
          type="password"
          name='password' />

        <button type='submit'
          >
          Ingresar
        </button>


        {/* divisor l ine */ }

        

      </div>
      <Link
          href="/auth/new-account" 
          className={styles.registerLink}>
          Crear una nueva cuenta
        </Link>
      </form>
  )
}
