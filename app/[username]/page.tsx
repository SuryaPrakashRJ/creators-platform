import prisma from "@/lib/db";
import Image from "next/image";
import { nunito_sans, bebas_neue } from "@/lib/fonts";
import Link from "next/link";
import { BsGlobe2 } from "react-icons/bs";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
interface Props {
  params: {
    username: string;
  };
}
const Products = [
  {
    heading: "Psychology of Money",
    subheading:
      "A book on understanding the psychology of money and how our views towards it can affect our financial lives.",
    description:
      "A book on understanding the psychology of money and how our views towards it can affect our financial lives.",
    pricing: "45",
  },
  {
    heading: "The Subtle Art of Not Giving a F*ck",
    subheading:
      "A book on changing your mindset and how you view the world around you.",
    description:
      "A book on understanding the psychology of money and how our views towards it can affect our financial lives.",
    pricing: "45",
  },
  {
    heading: "The 4-Hour Workweek",
    subheading: "A book on how to work less and live more.",
    description:
      "A book on understanding the psychology of money and how our views towards it can affect our financial lives.",
    pricing: "45",
  },
  {
    heading: "Atomic Habits",
    subheading: "A book on how to build good habits and break bad ones.",
    description:
      "A book on understanding the psychology of money and how our views towards it can affect our financial lives.",
    pricing: "45",
  },
  {
    heading: "The Alchemist",
    subheading:
      "A book on how to find your purpose in life and live it to the fullest.",
    description:
      "A book on understanding the psychology of money and how our views towards it can affect our financial lives.",
    pricing: "45",
  },
];

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
    // <div className=" bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-black ">
    <div className=" bg-white text-black  ">
      <div className="flex flex-col space-y-7  text-center justify-center mx-1">
        <div className="flex flex-col md:flex-row md:justify-between h-screen">
          <div className="flex flex-col items-center md:justify-center h-screen  md:sticky md:top-0 md:w-1/2 space-y-7">
            <div className="mt-3">
              <Image
                src={data.image}
                alt="profile pic"
                className="w-32 md:w-60 md:h-60 h-32 rounded-3xl object-center object-cover"
                height={124}
                width={124}
              />
              <p
                className={`text-[#525252] font-light md:text-[17px] ${nunito_sans.className}`}
              >
                @{data.username}
              </p>
            </div>
            <div className="flex flex-row space-x-3">
              {Array.isArray(socialLinks) &&
                socialLinks.map((link: any, index: number) => (
                  <div key={index}>
                    {link.value === "youtube" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiYoutube size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "twitter" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "linkedin" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "facebook" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiFacebook size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "instagram" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaInstagram size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "website" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsGlobe2 size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "github" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "dribbble" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaDribbble size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "behance" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaBehance size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "tiktok" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTiktok size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "email" && (
                      <a
                        href={`mailto:${link.url}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <HiOutlineMail size={25} className="text-black" />
                      </a>
                    )}
                  </div>
                ))}
            </div>

            <div className="space-y-5">
              <p
                className={`font-bold text-[26px] md:text-[38px] ${bebas_neue.className}`}
              >
                {data.name}
              </p>
              <p
                className={`text-[18px] text-[#3D3D3D] md:text-[20px] px-5 md:w-[500px] ${nunito_sans.className}`}
              >
                {data.bio}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 items-center space-y-6 overflow-y-auto md:max-h-screen md:w-1/2 md:mt-5">
          <h2 className="text-2xl font-bold">Products</h2>
            {Products.map((product, index) => (


              <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 hover:shadow-lg bg-transparent hover:border-2 border border-[#d1d5db] hover:border-green-600">
                <div className='grid-cols-2'>
                <div className="flex items-center  justify-center p-4">
                  <Image
                    src="./book.svg"
                    alt="book"
                    height={400}
                    width={400}
                    className="h-24 w-24 "
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h6 className="block font-sans text-lg font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {product.heading}
                    </h6>
                  </div>
                  <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased text-left">
                    {product.subheading}
                  </p>
                </div>
                <div className="p-6 pt-3">
                  <Link
                    className="block w-full select-none rounded-lg bg-green-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white   transition-all hover:bg-green-600  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    href={{
                      pathname: "/checkout",
                      query: {
                        heading: product.heading,
                        subheading: product.subheading,
                        description: product.description,
                        pricing: product.pricing,
                      }, // the data
                    }}
                  >
                    View
                  </Link>
                </div>
                </div>
              </div>

              // <div className="max-w-md  scroll-bar-hide md:scrollbar-default items-start md:max-w-lg  my-4 mx-4 px-5  w-full bg-transparent rounded-2xl border-2 border-transparent hover:border-gray-900 border-gray-100">
              //   <ul className="border rounded-lg  border-[#d4d4d8]">
              //     <div className="flex items-start  justify-between p-4">
              //       <Image
              //         src="./book.svg"
              //         alt="book"
              //         height={200}
              //         width={150}
              //         className="h-16 w-16 "
              //       />
              //       <div className="space-y-0">
              //         <h4 className="text-[#052e16] text-center justify-center font-semibold">
              //           {product.heading}
              //         </h4>
              //         <p className="text-[#525252]text-sm text-center ">
              //           {product.subheading}
              //         </p>
              //       </div>

              //     </div>
              //     <div className="py-2 px-4 border-t border-[#d4d4d8] text-center">
              // <Link                         className="text-green-500 hover:text-green-600 text-sm font-medium"

              //   href={{
              //     pathname: "/checkout",
              //     query: {heading:product.heading,subheading:product.subheading,description:product.description,pricing:product.pricing}, // the data
              //   }}
              // >

              //     View

              //   </Link>

              //     </div>
              //   </ul>
              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
