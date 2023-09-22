import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req:Request, {params}:{params:{token:string}}) {
    const { token } = params;
    const user = await prisma.user.findFirst({
        where: {
            ActivateToken: {
                some: {
                    AND: [
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                            }
                        },
                        {
                            token: token,
                        }
                    ],
                },
            },
        },
    });

    if (user) {
        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: true }
            }),
            prisma.activateToken.deleteMany({
                where: { userId: user.id }
            })
        ]);
        return NextResponse.redirect(`${process.env.DOMAIN}/sign-in`);
    } else {
        return NextResponse.json({ error: "User not found" });
    }
}