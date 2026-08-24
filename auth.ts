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
    token?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      token?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    username: string; 
    token?: string;
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
       
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string),
        });
        
        
        if (!user) {
          return null;
        }
        
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
      
        if (!passwordMatch) {
          return null;
        }
        
        return {
          id: user.id.toString(),
          name: user.name,
          username: user.username,
          token: user.token ?? undefined,
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
        token.token = user.token ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
        session.user.token = token.token as string | undefined;
      }
      return session;
    },
  },
});

