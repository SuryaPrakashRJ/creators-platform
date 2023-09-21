"use client";
import prisma from "@/lib/db";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col space-y-4  text-center justify-center">
      <h1>Dashboard Page</h1>
      {/* <div className="flex flex-col items-center">
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
        </div> */}
    </div>
  );
};

export default Page;
