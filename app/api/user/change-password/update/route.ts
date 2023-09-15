import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcrypt";
export async function PATCH (req:Request) {
  try{
    const body = await req.json()
    const { password,id } = body;
    const hashedPassword = await hash(password,10)
    await prisma.$transaction([
        prisma.user.update({
            where: { id: id },
            data: { hashedPassword: hashedPassword }
        }),
        prisma.activateToken.deleteMany({
            where: { userId: id }
        })
    ]);
    return NextResponse.json({message:"Success"},{status:201});
  }
  catch (error) {
    return NextResponse.json({message:"Error",error:`${error}`},{status:500});
  }

}