'use server';


import { signIn } from '@/auth.config';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // await sleep(2);
    console.log("Object fromEntries:", Object.fromEntries(formData)) //TODO DELETE THIS
    await signIn('credentials',{
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success'


  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return 'CredentialsSignin'
    }
    return 'Unknown error';

  }
}

export const login = async(email: string, password: string) =>{
  try {
    await signIn('credentials', {email, password})
    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo iniciar sesión"
    }
  }
}