import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/lib/db"; 

export const 
authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          return null;
        }
        if (!user.hashedPassword) {
          console.error("No hashed password found for user:", user.email);
          return null;
      }
        const passwordMatch = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          return null;
        }
        return {
          id: `${user.id}`,
          name: user.name,
          email: user.email,
        };
      },
    }),


  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          id: token.userId,
        },
      };
    },
  },
};