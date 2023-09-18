import { authOptions } from "@/lib/auth"
import {getServerSession} from "next-auth"
import prisma from "@/lib/db"
import Image from "next/image"

const Page = async () => {
    const session = await getServerSession(authOptions)
    console.log(session)
    const email = session?.user.email;

if (email === null || email === undefined) {
    // Handle the error case where email is null or undefined.
    throw new Error("Invalid email.");
}
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user) {
        throw new Error("Invalid user.")
    }

    const data = user as any
    if (data.image === null || data.image === undefined) {
        data.image = "/default-pfp.png"
    }
    
    return (
        <div className="flex flex-col space-y-4  text-center justify-center">
        <h1>Dashboard Page</h1>
        <div className="flex flex-col items-center">
        <Image src={data.image} alt="Profile Image" width={150} height={150} className="rounded-lg"></Image>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p>{data.bio}</p>
       <p>{data.emailVerified}</p>
       <p>{data.socialMediaLinks}</p>
        </div>
        </div>
    )
}

export default Page