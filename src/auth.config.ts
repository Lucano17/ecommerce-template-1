// import type { NextAuthConfig } from 'next-auth';
// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from "zod"
// import prisma from './lib/prisma';
// import bcryptjs from "bcryptjs"

// export const authConfig = {
//   pages: {
//     signIn: '/auth/login',
//     newUser: '/auth/new-account',
//   },
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);
      
//         console.log("Parsed Credentials:", parsedCredentials); // Log para ver las credenciales parseadas
      
//         if (!parsedCredentials.success) return null;
//         const { email, password } = parsedCredentials.data;
      
//         const user = await prisma.user.findUnique({
//           where: { email: email.toLowerCase() },
//         });
      
//         console.log("User Found:", user); // Log para ver el usuario encontrado
      
//         if (!user) {
//           console.log("No user found with this email."); // Log si no se encuentra usuario
//           return null;
//         }
      
//         const isPasswordCorrect = await bcryptjs.compare(password, user.password);
//         console.log("Password Match:", isPasswordCorrect); // Log para ver si las contraseñas coinciden
      
//         if (!isPasswordCorrect) {
//           console.log("Incorrect password."); // Log si la contraseña es incorrecta
//           return null;
//         }
      
//         // Eliminar la contraseña del objeto usuario
//         const { password: _, ...rest } = user;
//         return rest; // Devuelve el usuario sin la contraseña
//       },
//     }),
//   ] 
// } satisfies NextAuthConfig;

// export const { signIn, signOut, auth } = NextAuth(authConfig)


import NextAuth, {type NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from "bcryptjs";
import { z } from "zod"
import prisma from './lib/prisma';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
      
        console.log("Parsed Credentials:", parsedCredentials.success); // Log para ver las credenciales parseadas
      
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
      
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
      
        // console.log("User Found:", user); // Log para ver el usuario encontrado
      
        if (!user) {
          console.log("No user found with this email."); // Log si no se encuentra usuario
          return null;
        }
      
        if (!bcryptjs.compareSync(password, user.password)) return null

        // const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        // console.log("Password Match:", isPasswordCorrect); // Log para ver si las contraseñas coinciden
      
        // if (!isPasswordCorrect) {
        //   console.log("Incorrect password."); // Log si la contraseña es incorrecta
        //   return null;
        // }
      
        // Eliminar la contraseña del objeto usuario
        const { password: _, ...rest } = user;
        console.log({rest})
        return rest; // Devuelve el usuario sin la contraseña
      },
    }),
  ] 
} satisfies NextAuthConfig;

export const { signIn, signOut, auth } = NextAuth(authConfig)