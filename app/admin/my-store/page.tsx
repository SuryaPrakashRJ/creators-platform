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

  let socialLinks = null;
  if (user.socialMediaLinks) {
    socialLinks = JSON.parse(user.socialMediaLinks);
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

  console.log(user);
 

  return (
    <div className="text-center flex flex-col items-center">
      <div className="w-full space-y-3">
        <Breadcrumb
          className="px-5 py-3 rounded-lg shadow-lg bg-[#ffffff] text-lg font-semibold "
          separator=">"
          items={[
            {
              title: "Admin",
              href: "/admin/dashboard",
            },

            {
              title: "My Store",
            },
          ]}
        />
        <div className="2xl:container mx-auto">
          <div className="w-[98%] mx-auto grid grid-col-1 lg:grid-cols-3 gap-2">
            <Card title="Products " className="col-span-2 mr-5">
              {data &&
                data.DigitProducts.map((product: DigitProduct) => (
                  <div key={product.id} className="">
                    <Card
                      style={{ marginTop: 8 }}
                      // type="inner"
                      // title={product.heading}
                      // extra={<div className="space-x-4">
                      //   <Link href={`my-store/edit-product/${product.id}`} className="bg-green-400 px-4 py-2 rounded-lg  ">Edit</Link><button data-product-id={product.id} onClick={(e) =>handleProductDelete(e)} className="bg-red-500 px-4 py-2 rounded-lg " >Delete</button>
                      // </div>}
                    >
                      {/* <div className="flex items-start sm:gap-8">
                    <div
                      className="hidden sm:h-52 sm:w-36 sm:grid  sm:shrink-0 sm:place-content-center sm:border sm:border-[#087789] sm:rounded-lg"
                      aria-hidden="true"
                    >
                      <Image
                        src={product.productImgLink}
                        alt="Product Image"
                        width={144}
                        height={144}
                      />
                    </div>

                    <div>
                      <h3 className="mt-4 text-xl text-start font-medium sm:text-xl">
                        {product.heading}
                      </h3>

                      <p className="mt-1 text-lg text-start text-gray-700">
                        {product.subheading}
                      </p>

                      <p className="mt-1 text-lg text-gray-700">
                        {product.description}
                      </p>

                      <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-start gap-1 text-gray-500">
                          <p className="text-lg font-medium">
                            Price: {product.pricing}
                          </p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">
                          &middot;
                        </span>
                      </div>
                    </div>
                  </div> */}

                      <div className="md:flex items-start mx-10">
                        <div className="w-full md:w-1/6 px-10  ">
                          <div className="relative">
                            <img
                              src={`${product.productImgLink}`}
                              className="w-full relative z-10 rounded-md shadow-2"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 px-10">
                          <div className="mb-10">
                            <h1 className="font-bold text-start uppercase text-2xl mb-5">{`${product.heading}`}</h1>
                            <h1 className="font-bold text-start text-xl">{`${product.subheading}`}</h1>
                            <p className="text-sm text-start">
                              {`${product.description}`}
                            </p>
                            <h1 className="font-bold text-start  text-xl mt-2">
                              {product.pricing === 0
                                ? "Free"
                                : `Price: ${product.pricing}`}
                            </h1>
                          </div>
                          <div className="flex flex-col item-start space-y-2 justify-start sm:flex-row sm:space-x-2 sm:space-y-0 sm:item-start sm:justify-start">
                            <div className=" flex px-1">
                              <Link
                                href={`my-store/edit-product/${product.id}`}
                                className="bg-white opacity-75 border border-green-600 hover:bg-green-600 text-green-600 hover:text-white rounded-lg px-10 py-2 font-semibold w-full">
                                Edit
                              </Link>
                            </div>
                            <div className="flex px-1 ">
                              <button
                                data-product-id={product.id}
                                onClick={(e) => handleProductDelete(e)}
                                className="bg-white hover:bg-red-600 text-red-500 hover:text-white border border-red-600 rounded-lg font-semibold px-10 py-2 w-full">
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
            <div className="hidden lg:block">
              <div className=" flex justify-center text-center items-center  ">
                 <h1 className="mx-4 text-black font-semibold">
                Preview of your Store
              </h1>
              </div>
              <div className=" bg-white text-black rounded-md">
              <div className="flex flex-col space-y-7 text-center justify-center mx-1">
                  <div className="flex flex-col h-screen ">
                    <div className="flex flex-col items-center  h-screen space-y-7">
                      <div className="mt-3">
                        <Image
                          src={user.data.image}
                          alt="profile pic"
                          className="w-32 h-32 rounded-3xl object-center object-cover"
                          height={124}
                          width={124}
                        />
                        <p
                          className={`text-[#525252] font-light  ${nunito_sans.className}`}>
                          @{user.data.username}
                        </p>
                      </div>
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
                                    <FaTwitter
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                                    rel="noreferrer">
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
                      <div className="space-y-5">
                        <p
                          className={`font-bold text-[26px]  ${bebas_neue.className}`}>
                          {user.data.name}
                        </p>
                        <p
                          className={`text-[18px] text-[#3D3D3D]  px-5  ${nunito_sans.className}`}>
                          {user.data.bio}
                        </p>
                      </div>
                    </div>

                    <div className="grid  items-center justify-center   space-y-6 overflow-y-auto ">
                      <h2 className="text-2xl font-bold">Products</h2>
                      {data &&
                        data.DigitProducts.map((product: any, index: number) => (
                          <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 hover:shadow-lg bg-transparent hover:border border border-[#d1d5db] hover:border-green-600">
                            <div className="grid-cols-2">
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
                                    }, // the user.data
                                  }}>
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
                          //     query: {heading:product.heading,subheading:product.subheading,description:product.description,pricing:product.pricing}, // the user.data
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
            </div>
          </div>
        </div>
      </div>
      <AddProductButton />
    </div>
  );
}
