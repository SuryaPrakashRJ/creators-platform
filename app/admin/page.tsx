import { authOptions } from "@/lib/auth"
import {getServerSession} from "next-auth"
import prisma from "@/lib/db"
import Image from "next/image"

const Page = async () => {
    const session = await getServerSession(authOptions)
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
        <Image
            src={data.image}
            alt="profile pic"
            className="w-36 h-36 rounded-xl object-center object-cover"
            height={144}
            width={144}
          />
        <p>{data.name}</p>
        <p>{data.username}</p>
        <p>{data.email}</p>
        <p>{data.bio}</p>
       <p>{data.emailVerified}</p>
       <p>{data.socialMediaLinks}</p>
        </div>
        </div>
    )
}

export default Page