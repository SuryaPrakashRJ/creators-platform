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
        return NextResponse.json({user: user, message:"Success"},{status:201})
    } else {
        return NextResponse.json({ error: "User not found" });
    }
};