
import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from "bcryptjs";
import { z } from "zod"
import prisma from './lib/prisma';


const authenticatedRoutes = [
  "checkout/address"
]

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {

    // authorized({ auth, request: { nextUrl } }) {
    //   console.log({auth})
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith(`${authenticatedRoutes}`);
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/', nextUrl));
    //   }
    //   return true;
    // },

    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session
    }
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

       
        const { password: _, ...rest } = user;  // Eliminar la contraseña del objeto usuario
        console.log({ rest })
        return rest; // Devuelve el usuario sin la contraseña
      },
    }),
  ]
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)