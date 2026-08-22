import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import "next-auth";
import "next-auth/jwt"; 


declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    username: string; 
  }

  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    username: string; 
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔑 [AUTH] Credenciales recibidas:", { 
          username: credentials?.username, 
          hasPassword: !!credentials?.password 
        });
        if (!credentials?.username || !credentials?.password) {
           console.log("❌ [AUTH] Faltan credenciales");
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string),
        });
        
        console.log("👤 [AUTH] Usuario encontrado en BD:", user ? "SÍ" : "NO");
        if (!user) {
          console.log("❌ [AUTH] Usuario no existe");
          return null;
        }
        
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
         console.log("🔐 [AUTH] ¿La contraseña coincide?:", passwordMatch);
        if (!passwordMatch) {
           console.log("❌ [AUTH] Contraseña incorrecta");
          return null;
        }
        console.log("✅ [AUTH] Login exitoso, devolviendo usuario");
        return {
          id: user.id.toString(),
          name: user.name,
          username: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});

