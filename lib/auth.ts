import { Prisma } from "@prisma/client";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import  {PrismaAdapter}  from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(prisma),
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt',
    },
    pages:{
        signIn:'/auth/sign-in',
    },
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "email", type: "email", placeholder: "example@email.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                return null;
            }
            const user = await prisma.user.findUnique({
                where:{
                    email:credentials?.email
                }
            });
            if(!user){
                return null;
            }
            const passwordMatch = await compare(credentials.password, user.password);
            if(!passwordMatch){
                return null;
            }
            return{
                id:`${user.id}`,
                name:user.name,
                email:user.email,
                country:user.country,
            }
          }
        })
      ],
        callbacks:{
            async jwt({ token,user }) {
                
                if (user) {
                    return{
                    ...token,
                    name:user.name,
                    }
                }
                return token
                
              },
              async session({ session, user, token }) {
                console.log(session , token.name)
                return{
                    ...session,
                    user:{
                        ...session.user,
                        name:token.name,
                    }
                    
                }
              
  
              
        },
    }

}