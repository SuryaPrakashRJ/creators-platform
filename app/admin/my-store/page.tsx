"use client";
import AddProductButton from "@/components/dashboard/Store/AddProductButton";
import { useEffect, useState } from "react";
import { Breadcrumb, Card } from "antd";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/dashboard/common/Loader";
import Link from "next/link";
import Image from "next/image";

import { nunito_sans, bebas_neue } from "@/lib/fonts";
import { BsGlobe2 } from "react-icons/bs";
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaXTwitter, FaDribbble } from "react-icons/fa6";
import ProfileCard from "@/components/dashboard/Profile/ProfileCard"
interface Props {
  params: {
    username: string;
  };
}

type DigitProduct = {
  id: number;
  email: string;
  productImgLink: string;
  heading: string;
  subheading: string;
  pricing: number;
  buttonTitle: string;
  downloadable: boolean;
  description: string;
  fileUrl: string;
};

type DataType = {
  DigitProducts: DigitProduct[];
};

export default function Page() {
  const { user } = useAuth();
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Products = async () => {
      const res = await fetch(
        `https://creators-platform-backend-production.up.railway.app/api/v1/users/${user?.data.id}/products`
      );
      const jsonData = await res.json();
      console.log(jsonData);
      setData(jsonData.data);
      setLoading(false);
    };
    Products();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  console.log(data);
  const userData = user.data;
  let socialLinks = null;
  if (userData.socialMediaLinks) {
    socialLinks = JSON.parse(userData.socialMediaLinks);
  }

  async function handleProductDelete(e: any) {
    setLoading(true);
    const productId = e.currentTarget.getAttribute("data-product-id");
    await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/digital_download/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/users/${user?.data.id}/products`
    );
    const jsonData = await res.json();
    setData(jsonData.data);
    setLoading(false);
  }

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
    <div className="text-center flex flex-col items-center">
      <div className="w-full space-y-3">
        <div className="2xl:container mx-auto">
          <div className="w-[100%] mx-auto grid grid-col-1 lg:grid-cols-3 gap-2">
            <div className="col-span-2 mr-5 mb-5">
              <Breadcrumb
                className="px-5 py-3 text-lg font-semibold "
                separator=">"
                items={[
                  {
                    title: "Admin",
                    href: "/admin/overview",
                  },

                  {
                    title: "My Store",
                  },
                ]}
              />
              


              
              <AddProductButton />
              <ProfileCard />
              <Card title="Products">
                
                
                



                {data &&
                  data.DigitProducts.map((product: DigitProduct) => (
                    <div key={product.id} className="">
                      
                      <Card
                        style={{ marginTop: 8 }}
                        >

                        <div className="md:flex items-start ">
                        <div className="w-full md:w-2/6 px-10 ">
                            <div className="relative">
                            <div className="flex flex-col  justify-center items-center text-center ">
                              <img
                                src={`${product.productImgLink}`}
                                // className="  w-full  relative  rounded-md shadow-2 "
                                alt=""
                            
                                 className="w-36 h-36 rounded-xl object-center object-cover border border-[#aeaeae]"
                                 height={144}
                                 width={144}
                            
                              />
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-5/6 px-10">
                            <div className="mb-4">
                              <h1 className="font-bold text-center text-2xl mb-5 sm:text-start">{`${product.heading}`}</h1>
                              <h1 className="font-semibold text-center sm:text-start text-lg">{`${product.subheading}`}</h1>
                              <p className="text-sm text-center sm:text-start">
                                {`${product.description}`}
                              </p>
                              <h1 className="font-bold text-start  text-xl mt-2">
                                {product.pricing === 0
                                  ? "Free"
                                  : `Price: ${product.pricing}`}
                              </h1>
                            </div>
                            <div className="flex flex-col item-start space-y-2 justify-start sm:flex-row sm:space-x-2 sm:space-y-0 sm:item-start sm:justify-start">
                              <div className=" flex ">
                                <Link
                                  href={`my-store/edit-product/${product.id}`}
                                  className="bg-green-500   hover:bg-green-600 text-white hover:text-white rounded-lg px-6 mt-1 py-2 font-semibold w-full"
                                >
                                  Edit
                                </Link>
                              </div>
                              <div className="flex  items-center justify-center ">
                                <button
                                  data-product-id={product.id}
                                  onClick={(e) => handleProductDelete(e)}
                                  className="bg-red-500   hover:bg-red-600 text-white hover:text-white rounded-lg px-6 mt-1 py-2 font-semibold w-full"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
              </Card>
            </div>
            <div className="hidden lg:block">
              <div className="my-4 flex justify-center text-center items-center  ">
                <h1 className=" text-black font-semibold">Preview</h1>
              </div>
              <div className=" bg-[#F8FAFC] text-black rounded-2xl max-h-[40rem] overflow-y-auto border-black border-y-4 border-x-2  scrollbar-hide">
                <div className="flex flex-col space-y-7  text-center justify-center mx-1 ">
                  <div className="flex flex-col ">
                    <div className="flex flex-col mt-6   items-center  space-y-3 ">
                      <div className=" space-y-4 items-center flex flex-col">
                        <Image
                          src={userData.image}
                          alt="profile pic"
                          className="w-32   h-32 rounded-3xl object-center object-cover "
                          height={84}
                          width={84}
                        />
                        <p className={`font-bold text-[18px] `}>
                          {userData.name}
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
                                    <FiYoutube
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaXTwitter
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaLinkedin
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FiFacebook
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaInstagram
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <BsGlobe2
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaGithub
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaDribbble
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaBehance
                                      size={25}
                                      className="text-black"
                                    />
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
                                    <FaTiktok
                                      size={25}
                                      className="text-black"
                                    />
                                  </a>
                                )}
                                {link.value === "email" && (
                                  <a
                                    href={`mailto:${link.url}`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <HiOutlineMail
                                      size={25}
                                      className="text-black"
                                    />
                                  </a>
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                      <div>
                        <div className=" text-center pt-2 w-fit mx-2  ">
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
                        <p className={`font-bold text-[20px]  `}>About</p>
                        <p
                          className={`text-[16px] text-[#606060]  px-5 max-w-[45rem]  ${nunito_sans.className}`}
                        >
                          {userData.bio}
                        </p>
                      </div>
                    </div>

                    {data && (
                      <div className=" mx-5  text-center grid grid-cols-1  items-center justify-center space-y-4 overflow-y-auto ">
                        <h2 className="text-2xl font-bold mt-6">Products</h2>
                        {data.DigitProducts.length > 0 &&
                          data.DigitProducts.map(
                            (product: any, index: number) => (
                              <div className=" relative flex w-full  flex-col rounded-xl  bg-white bg-clip-border text-gray-700 shadow-xl  bg-transparent ">
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
                                        heading: product.heading,
                                        subheading: product.subheading,
                                        description: product.description,
                                        pricing: product.pricing,
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
                            )
                          )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
