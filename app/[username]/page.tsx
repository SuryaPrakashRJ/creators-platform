import prisma from "@/lib/db";
import Image from "next/image";
import { nunito_sans } from "@/lib/fonts";
import {
  SlSocialYoutube,
  SlSocialTwitter,
  SlSocialFacebook,
  SlSocialLinkedin,
  SlSocialInstagram,
} from "react-icons/sl";
import { BsGlobe2 } from "react-icons/bs";
interface Props {
  params: {
    username: string;
  };
}

export default async function Page({ params }: Props) {
  const username = params.username;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  const data = user as any;
  if (data.image === null || data.image === undefined) {
    data.image = "/default-pfp.png";
  }
  const socialLinks = JSON.parse(data.socialMediaLinks);

  return (
    <div className="flex flex-col space-y-4  text-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="mt-3">
          <Image
            src={data.image}
            alt="Profile Image"
            width={150}
            height={150}
            className="rounded-lg"
          ></Image>
          <p className={`text-[#525252] font-light ${nunito_sans.className}`}>
            @{data.username}
          </p>
        </div>
        <div className="flex flex-row space-x-3">
          {Array.isArray(socialLinks) &&
            socialLinks.map((link: any, index: number) => (
              <div key={index}>
                {link.value === "youtube" && (
                  <a href={link.url.startsWith('http') ? link.url : 'https://' + link.url} target="_blank" rel="noreferrer">
                    <SlSocialYoutube size={20} className="text-black" />
                  </a>
                )}
                {link.value === "twitter" && (
                  <a href={link.url.startsWith('http') ? link.url : 'https://' + link.url} target="_blank" rel="noreferrer">
                    <SlSocialTwitter size={20} className="text-black" />
                  </a>
                )}
                {link.value === "linkedin" && (
                  <a href={link.url.startsWith('http') ? link.url : 'https://' + link.url} target="_blank" rel="noreferrer">
                    <SlSocialLinkedin size={20} className="text-black" />
                  </a>
                )}
                {link.value === "facebook" && (
                  <a href={link.url.startsWith('http') ? link.url : 'https://' + link.url} target="_blank" rel="noreferrer">
                    <SlSocialFacebook size={20} className="text-black" />
                  </a>
                )}
                {link.value === "instagram" && (
                  <a href={link.url.startsWith('http') ? link.url : 'https://' + link.url} target="_blank" rel="noreferrer">
                    <SlSocialInstagram size={20} className="text-black" />
                  </a>
                )}
                {link.value === "website" && (
                  <a href={link.url.startsWith('http') ? link.url : 'https://' + link.url} target="_blank" rel="noreferrer">
                    <BsGlobe2 size={20} className="text-black" />
                  </a>
                )}
              </div>
            ))}
        </div>
        <p>{data.name}</p>

        <p>{data.email}</p>
        <p>{data.bio}</p>
        <p>{data.emailVerified}</p>
      </div>
    </div>
  );
}
