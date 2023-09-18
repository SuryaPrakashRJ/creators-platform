import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
export async function POST(req:Request) {
    try{
        const body = await req.json()
        const {email} = body
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            return NextResponse.json({user:null , message:"Email does not exist"},{status:404})
        }
        const token = await prisma.activateToken.create({
            data:{
                token: `${randomUUID()}${randomUUID()}`.replace(/-/g,''),
                userId:user.id
            }
        })
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
            to: user.email,
            // cc: email, (uncomment this line if you want to send a copy to the sender)
            subject: `Reset Password for ${user.name}`,
            text: `Click this link to reset your password for your account: ${process.env.DOMAIN}/confirm-password/${token.token}`,
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
            return NextResponse.json({ user:user, message: 'Success' },{status:201});
          } catch (err) {
            return NextResponse.json({ error: err }, { status: 501 });
          }

    }
    catch(err){
        return NextResponse.json({ message:"Error", err:err},{status:500 })
    }

}