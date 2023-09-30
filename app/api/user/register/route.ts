import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import {hash} from 'bcrypt'
import { randomUUID } from "crypto"
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(req:Request) {
try{
    const body = await req.json()
    const {email,name,username,password} = body
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username:username }]
      }
    });

    if (existingUser && existingUser.email === email) {
      return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
    }
    if (existingUser && existingUser.name === name) {
      return NextResponse.json({ user: null, message: "User Name already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password,10)
    const newUser = await prisma.user.create({
        data:{
            email:email,
            name:name,
            username:username,
            hashedPassword:hashedPassword,
            bio:"Please add a bio",
            image:"https://res.cloudinary.com/dpscigyio/image/upload/f_auto,q_auto/pudwsxkwsp3glaxkiyt2",
            socialMediaLinks:""
        }
    })

    const {hashedPassword:pass, ...user} = newUser
    const token = await prisma.activateToken.create({
        data:{
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g,''),
            userId:newUser.id
        }
    })  
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });
  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: newUser.email,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Authenticate your mail on CreatorCard`,
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
    await sendMailPromise();
    return NextResponse.json({ user:user, message: 'Success' },{status:201});
}
catch(err){
    return NextResponse.json({ message:"Error", err:err},{status:500 })
}
}