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
const page = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Products = async () => {
      const res = await fetch(
        `${process.env.BASEURL}/api/v1/users/${user?.data.id}/products`
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
      `${process.env.BASEURL}/api/v1/digital_download/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await fetch(
      `${process.env.BASEURL}/api/v1/users/${user?.data.id}/products`
    );
    const jsonData = await res.json();
    setData(jsonData.data);
    setLoading(false);
  }

  return (
    <div className="mb-4 mt-4">
      <Card style={{ marginTop: 4 }}>
        <div className="md:flex items-start bg-white  rounded-lg ">
          <div className="w-full md:w-2/6 px-10 ">
            <div className="relative">
              <div className="flex flex-col  justify-center items-center text-center">
                <img
                  src={`${userData.image}`}
                  // className="  w-full  relative  rounded-md shadow-2 "
                  alt=""
                  className="w-36 h-36 rounded-xl object-center object-cover"
                  height={144}
                  width={144}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-5/6 px-10 ">
            <div className="mb-2  ">
              <h1 className="font-bold text-center text-2xl mb-2 sm:text-start">{`${userData.name}`}</h1>
              {socialLinks && (
                <div className="flex flex-row space-x-3 sm:items-start sm:justify-start items-center justify-center">
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
            </div>
            <div className="flex flex-col mt-4 item-start space-y-2 justify-start sm:flex-row sm:space-x-2 sm:space-y-0 sm:item-start sm:justify-start">
              <div className=" flex ">
                <Link
                  href={`/admin/settings`}
                  className="bg-green-500   hover:bg-green-600 text-white hover:text-white rounded-lg px-6 mt-1 py-2 font-semibold w-full"
                >
                  Update profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default page;
