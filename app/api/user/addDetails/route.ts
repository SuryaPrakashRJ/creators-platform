// import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import {  NextResponse } from "next/server";


export async function PATCH(req:Request) {
  const body = await req.json();
  const { bio, picUrl,socialMediaLinks } = body;
  const userId = body.userId;
  const socialMediaLinksJSON = JSON.stringify(socialMediaLinks);
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { bio, image:picUrl, socialMediaLinks:socialMediaLinksJSON },
    });
    return NextResponse.json({user: updatedUser, message:"Success"},{status:201});
  } catch (error) {
    return NextResponse.json({message:"Error",error:`${error}`},{status:500});
  }
}
