// import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import {  NextResponse } from "next/server";


export async function PATCH(req:Request) {
  console.log(req.body)
  const body = await req.json();
  console.log(body)
  const { bio, picUrl } = body;
  const userId = body.userId;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { bio, image:picUrl },
    });
    return NextResponse.json({user: updatedUser, message:"Success"},{status:201});
  } catch (error) {
    return NextResponse.json({message:"Error",error:`${error}`},{status:500});
  }
}
