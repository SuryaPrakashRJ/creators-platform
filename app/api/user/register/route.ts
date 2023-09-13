import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import * as z from 'zod'

const userSchema = z.object({
    email:z.string().min(1,'Email is required').email('Invalid Email'),
    name:z.string().min(1,'Name is required'),
    password:z.string().min(1,'Password is required').min(8,'Password must be at least 8 characters'),
    confirm_password:z.string().min(1,'Confirm Password is required').min(8,'Confirm Password must be at least 8 characters'),
    country:z.string().min(1,'Country is required')
})
.refine((data) => data.password === data.confirm_password,{
    message:"Passwords do not match",
})

export async function POST(req:Request) {
try{
    const body = await req.json()
    const {email,name,password,country} = userSchema.parse(body)

    //checking if there is any email or username already registered

    const emailExists = await prisma.user.findUnique({
        where:{email:email}
    })
    if(emailExists){
        return NextResponse.json({user:null , message:"Email already exists"},{status:409})
    }
    
    const nameExists = await prisma.user.findUnique({
        where:{name:name}
    })
    if(nameExists){
        return NextResponse.json({user:null , message:"User Name already exists"},{status:409})
    }
    const hashedPassword = await hash(password,10)
    const newUser = await prisma.user.create({
        data:{
            email:email,
            name:name,
            password:hashedPassword,
            country:country
        }
    })
    const {password:pass, ...user} = newUser
    return NextResponse.json({user: user, message:"Success"},{status:201});
}
catch(err){
    return NextResponse.json({ message:"Error"},{status:500 });

}

}
