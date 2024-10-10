
"use server";

import { signIn } from "@/auth.config";
import { redirect } from "next/navigation"; 

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
      // Devolvemos el error específico de la respuesta de NextAuth
      return { error: response.error };
    }

    if (!response?.ok) {
      // Si la respuesta no es OK, algo salió mal
      return { error: "Error de autenticación. Por favor, revisa tus credenciales." };
    }

    // Si es exitoso, redirigir al usuario
    redirect('/');

  } catch (error) {
    console.error("Error en authenticate:", error);
    return { error: "Error inesperado, por favor intenta nuevamente." };
  }
}
