"use client";
import { useEffect } from "react";
import Image from "next/image";
import { UploadButton } from "@/src/types/uploadthing";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import Loader from "@/components/dashboard/common/Loader";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}
export default function Page({ params }: Props) {
  const { id } = params;
  const [data, setData] = useState<any>(null);
  const [urls, setUrls] = useState<any>();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `https://creators-platform-backend-production.up.railway.app/api/v1/digital_download/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await res.json();
      console.log(jsonData);
      setData(jsonData.data);
      setUrls(
          jsonData.data?.attachment
          );
      setPreLoading(false);
    };
    fetchProduct();
  }, [id]);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [buttonText, setButtonText] = useState("Buy Now");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!title || !subTitle || !productImgUrl || !description) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
      });
      setLoading(false);
      return;
    }
    const res = await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/digital_download/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          heading: title,
          subheading: subTitle,
          productImgLink: productImgUrl,
          description,
          pricing: Number(price),
          buttonTitle: buttonText,
          downloadable: true,
          fileUrl,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.message === "Post Data Successfully") {
      toast({
        title: "Product Added",
        description: "Product has been added successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  // const socialLinks = user.data.socialMediaLinks;

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action:
      "https://creators-platform-backend-production.up.railway.app/api/v1/file/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFileUrl(info.file.response.message[0].Location);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleDelete = (e:any) => {
    e.preventDefault()
    const urlId = e.currentTarget.getAttribute('data-product-id')
    console.log(urlId);
  }

  console.log(urls)

  if (preLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div>
      <div>
        <div className="py-10 flex flex-col justify-center bg-[#ffffff] rounded-xl">
          <div className="2xl:container">
            <div className="w-[90%] mx-auto grid grid-cols-1">
              <form className="space-y-6">
                <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0 ">
                  <div className="px-3">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#0f280a]"
                    >
                      Product Image
                    </label>
                    <div className="flex flex-col justify-center items-center text-center">
                      <Image
                        src={
                          data.product.productImgLink ||
                          productImgUrl
                        }
                        alt="profile pic"
                        className="h-52 w-36 rounded-xl object-center object-cover"
                        height={144}
                        width={144}
                      />
                    </div>
                  </div>

                  <div className="">
                    <UploadButton
                      className="bg-green-600 py-1 sm:py-3 sm:px-3  text-[#ffffff] rounded-lg"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        const url = res?.[0].url || "";
                        setProductImgUrl(url);
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col justify-between sm:space-x-5 space-y-5 sm:space-y-0">
                  <div className="w-full">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#0f280a]  "
                    >
                      Product Title
                    </label>
                    <input
                      id="message"
                      className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                      placeholder={
                        data.product.heading || "Enter the product title"
                      }
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#0f280a]"
                    >
                      Product Sub-title
                    </label>
                    <input
                      id="message"
                      className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                      placeholder={
                        data.product.subheading || "Enter the product sub-title"
                      }
                      onChange={(e) => setSubTitle(e.target.value)}
                    ></input>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="message"
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                    placeholder={
                      data.product.description ||
                      "Enter the product description"
                    }
                    rows={6}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Upload File
                  </label>
                  <Upload
                    {...props}
                    className="flex flex-col py-6 border rounded-lg items-center justify-center text-center text-[#0f280a] bg-[#F1F5F9]"
                  >
                    <p className="ant-upload-text text-center font-medium">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint text-center font-medium">
                    Supports single or bulk uploads of digital assets (ZIP, RAR, PDF).
                    </p>
                  </Upload>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Uploaded URLS
                  </label>
                  {/* {urls.map((url: any, index:number) => (
                    <div className="flex space-x-5">
                      <Link href={url}>
                        <div className="mt-3">
                          <div className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5">
                            {url}
                          </div>
                        </div>
                      </Link>
                      <button data-product-id={index+1} onClick={(e)=>handleDelete(e)}>
                        <svg
                          fill="#000000"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="20"
                          height="20"
                          viewBox="0 0 482.428 482.429"
                          xmlSpace="preserve"
                        >
                          <g>
                            <g>
                              <path
                                d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"
                              />
                              <path
                                d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                              />
                              <path
                                d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                              />
                              <path
                                d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                              />
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                  ))} */}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Product Price
                  </label>
                  <input
                    id="number"
                    disabled
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5"
                    placeholder={"Free"}
                    onChange={(e) => setPrice(e.target.value)}
                  ></input>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Checkout Button Text
                  </label>
                  <input
                    id="number"
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5"
                    placeholder={
                      data.buttonTitle || "Enter the checkout button text"
                    }
                    onChange={(e) => setButtonText(e.target.value)}
                  ></input>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className=" bg-[#22C55E]   text-[#ffffff] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-green-600 font-medium  "
                    onClick={handleSubmit}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
