import { authOptions } from "@/lib/auth"
import {getServerSession} from "next-auth"

const Page = async () => {
    const session = await getServerSession(authOptions)
    const name = session?.user?.name
    return (
        <div>
        <h1>Welcome {name}</h1>
        </div>
    )
}

export default Page