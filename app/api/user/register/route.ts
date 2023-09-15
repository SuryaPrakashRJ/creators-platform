import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import * as z from 'zod'
import { randomUUID } from "crypto"
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const email = process.env.GOOGLE_MAIL || '';
const password = process.env.GOOGLE_PASS || '';


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
    const {email,name,password} = userSchema.parse(body)

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
            hashedPassword:hashedPassword,
        }
    })
    
    const {hashedPassword:pass, ...user} = newUser
    const token = await prisma.activateToken.create({
        data:{
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g,''),
            userId:newUser.id
        }
    })

    console.log(token)
    
const transport = nodemailer.createTransport({
    service: 'gmail',
    /* 
        setting service as 'gmail' is same as providing these setings:
  
        host: "smtp.gmail.com",
        port: 465,
        secure: true
        
        If you want to use a different email provider other than gmail, you need to provide these manually.
        Or you can go use these well known services and their settings at
        https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
    */
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });


 
  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: newUser.email,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Authenticate your mail on Zello`,
    text: `Click this link to authenticate your account: ${process.env.DOMAIN}/api/user/activate/${token.token}`,
  };

  const sendMailPromise = () =>
  new Promise<string>((resolve, reject) => {
    transport.sendMail(mailOptions, function (err) {
      if (!err) {
        resolve('Email sent');
      } else {
        reject(err.message);
      }
    });
  });
  try {
    await sendMailPromise();
    console.log('Email sent');
    return NextResponse.json({ user:user, message: 'Success' },{status:201});
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 501 });
  }
    // return NextResponse.json({user: user, message:"Success"},{status:201});
}
catch(err){
    return NextResponse.json({ message:"Error", err:err},{status:500 })
}
}
