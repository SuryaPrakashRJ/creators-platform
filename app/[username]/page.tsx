"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { nunito_sans } from "@/lib/fonts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsGlobe2 } from "react-icons/bs";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
interface Props {
  params: {
    username: string;
  };
}

import Loader from "@/components/dashboard/common/Loader";

export default function Page({ params }: Props) {
  const username = params.username;
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userProducts, setUserProducts] = useState<any[]>([]);
const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch user details
        let res = await fetch(
          `https://creators-platform-backend-production.up.railway.app/api/v1/users/username/${username}`
        );
        if (!res.ok) throw new Error("Failed to fetch user details");

        const userData = await res.json();
        setUser(userData.data);
        setUserLoading(false);

        if (!userData.data) {
          router.push("/not-taken")
        }

        // Using the user ID to fetch products
        res = await fetch(
          `https://creators-platform-backend-production.up.railway.app/api/v1/users/${userData.data.id}/products`
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        const productsData = await res.json();
        setUserProducts(productsData.data.DigitProducts);
        setProductsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setUserLoading(false);
        setProductsLoading(false);
      }
    }

    fetchData();
  }, [username]);
  console.log(user);

  if (userLoading || productsLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  let socialLinks = null;
  if (user.socialMediaLinks) {
    socialLinks = JSON.parse(user.socialMediaLinks);
  }
  console.log(userProducts);

  const Hashtags = [
    {
      text: "Influencer",
    },
    {
      text: "Influencer",
    },
    {
      text: "Brands",
    },
    {
      text: "Brands",
    },
    {
      text: "Social Media",
    },
    {
      text: "Content Creator",
    },
  ];

  return (
    // <div className=" bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-black ">
    <div className=" bg-[#F8FAFC] text-black  ">
      <div className="flex flex-col space-y-7  text-center justify-center mx-1 ">
        <div className="flex flex-col md:flex-row md:justify-between md:h-screen ">
          <div className="flex flex-col mt-6 sm:mt-14  items-center md:justify-start md:overflow-y-auto md:sticky md:top-0 md:w-1/2.5 space-y-3 ">
            <div className=" space-y-4 items-center flex flex-col">
              <Image
                src={user.image}
                alt="profile pic"
                className="w-32 md:w-44 md:h-44  h-32 rounded-3xl object-center object-cover "
                height={84}
                width={84}
              />
              <p className={`font-bold text-[18px] md:text-[20px]`}>
                {user.name}
              </p>
            </div>
            <div></div>
            {socialLinks && (
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
                      {link.value === "x" && (
                        <a
                          href={
                            link.url.startsWith("http")
                              ? link.url
                              : "https://" + link.url
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaXTwitter size={25} className="text-black" />
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
            )}
            <div>
              <div className=" text-center pt-2 w-fit mx-2 sm:mx-0 ">
                <div className="flex-row items-center  justify-center space-x-2 space-y-2 sm:space-y-0 flex-grow flex-wrap inline-flex pb-4 text-graydark ">
                  {Hashtags.map((hashtag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center px-2 py-1 text-sm font-semibold leading-none bg-[#F1F5F9] rounded-full"
                    >
                      <span className="mr-1 text-black">#</span>
                      {hashtag.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className={`font-bold text-[20px]  `}>
                About
              </p>
              <p
                className={`text-[16px] text-[#606060] md:text-[16px] px-5 max-w-[45rem]  ${nunito_sans.className}`}
              >
                {user.bio}
              </p>
            </div>
          </div>

          {userProducts.length > 0 && (
            <div className="sm:bg-[#F8FAFC] mx-5 sm:mx-0 text-center grid grid-cols-1 sm:grid-cols-2 items-center justify-center space-y-4 overflow-y-auto md:w-[45rem]">
              <h2 className="text-2xl font-bold mt-6">Products</h2>
              {userProducts &&
                userProducts.map((product: any, index: number) => (
                  <div className=" relative flex w-full sm:max-w-[20rem] flex-col rounded-xl sm:mx-auto bg-white bg-clip-border text-gray-700 shadow-xl  bg-transparent ">
                    <div className="flex items-center  justify-center p-3">
                      <Image
                        src={product.productImgLink}
                        alt="book"
                        height={400}
                        width={400}
                        className="h-24 w-24 rounded-lg border border-[#F1F5F9]"
                      />
                    </div>
                    <div className="px-6 py-2 ">
                      <div className="mb-1 flex items-center justify-center">
                        <h6 className="block font-sans text-lg font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                          {product.heading}
                        </h6>
                      </div>
                      <p className="block  text-sm font-normal leading-relaxed text-gray-700 antialiased text-center ">
                        {product.subheading}
                      </p>
                    </div>
                    <div className="p-6 pt-2">
                      <Link
                        className="block w-full select-none rounded-lg bg-green-500 py-3 px-7 text-center align-middle font-sans text-base font-medium text-white   transition-all hover:bg-green-600  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        href={{
                          pathname: "/checkout",
                          query: {
                            id: product.id,
                            heading: product.heading,
                            subheading: product.subheading,
                            description: product.description,
                            pricing: product.pricing,
                            image: product.productImgLink,
                            buttonText: product.buttonTitle,
                          }, // the user
                        }}
                      >
                        View
                      </Link>
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
                  //     query: {heading:product.heading,subheading:product.subheading,description:product.description,pricing:product.pricing}, // the user
                  //   }}
                  // >

                  //     View

                  //   </Link>

                  //     </div>
                  //   </ul>
                  // </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
