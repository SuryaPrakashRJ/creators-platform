import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req:NextRequest, {params}:{params:{token:string}}) {
const {token} = params

const user = await prisma.user.findFirst({
    where:{
        ActivateToken:{
            some:{
                AND:[
                    {
                        createdAt:{
                            gt:new Date(Date.now() - 24 * 60 * 60 * 1000)
                            
                        }
                    },
                    {
                        token:token,
                    }
                ],
            },
            },
        },
})

if(!user){
    throw new Error('Invalid Token')
}

await prisma.$transaction([
    prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true }
    }),
    prisma.activateToken.deleteMany({
        where: { userId: user.id }
    })
]);

redirect('/sign-in')

}