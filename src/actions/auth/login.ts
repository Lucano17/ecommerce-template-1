// 'use server';
 
// import { signIn } from '@/auth.config';
 
// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     console.log(Object.fromEntries(formData)) //TODO Delete this console.log
//     await signIn('credentials', {
//       ...Object.fromEntries(formData)});
//   } catch (error) {
//     if ((error as Error).message.includes('CredentialsSignin')) {
//           return 'CredentialsSignin';
//       }
//       throw error;
//     }
//   }


// src/actions/auth/authenticate.ts

"use server";

import { signIn } from "@/auth.config";
import { redirect } from "next/navigation"; // Para manejar redirecciones del lado servidor

export async function authenticate(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: "Email y contraseña son requeridos." };
    }

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false, // Evita redirección automática
    });

    if (response?.error) {
      return { error: response.error };
    }

    // Si la autenticación es exitosa, puedes redirigir
    redirect('/');
  } catch (error) {
    return { error: "Error inesperado, por favor intenta nuevamente." };
  }
}
