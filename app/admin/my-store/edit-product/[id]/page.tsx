"use client";
import { useEffect } from "react";
import Image from "next/image";
import { UploadButton } from "@/src/types/uploadthing";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import type { UploadProps } from "antd";
import { Breadcrumb, message, Upload } from "antd";
import { useRouter } from "next/navigation";
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
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [fileUrl, setFileUrl] = useState<any[]>([]);
  const [attachmentId, setAttachmentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [preLoading, setPreLoading] = useState(true);
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
      setData(jsonData.data);
      setUrls(JSON.parse(jsonData.data?.attachment.attachments[0].fileUrl));
      setTitle(jsonData.data.product.heading);
      setSubTitle(jsonData.data.product.subheading);
      setProductImgUrl(jsonData.data.product.productImgLink);
      setDescription(jsonData.data.product.description);
      setPrice(jsonData.data.product.pricing);
      setButtonText(jsonData.data.product.buttonTitle);
      setFileUrl(JSON.parse(jsonData.data?.attachment.attachments[0].fileUrl));
      setAttachmentId(jsonData.data?.attachment.attachments[0].id);
      setPreLoading(false);
    };
    fetchProduct();
  }, [id]);
  console.log(data);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/digital_download/${data.product.id}`,
      {
        method: "PUT",
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
          // downloadable: true,
          fileUrl: JSON.stringify(fileUrl),
        }),
      }
    );
    const post = await res.json();
    console.log(post);
    setLoading(false);
    if (post.message === "Product updated successfully") {
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
        setFileUrl((prevFileUrls) => [
          ...prevFileUrls,
          ...info.fileList.map((file) => ({
            url: file.response.message[0].Location,
            key: file.response.message[0].Key,
            name: file.response.message[0].originalname,
          })),
        ]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const urlKey = e.currentTarget.getAttribute("data-product-key");
    const res = await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/file/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          filekey: urlKey,
          id: attachmentId,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.message === "File deleted successfully") {
      toast({
        title: "File Deleted",
        description: "File has been deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  console.log(attachmentId);

  if (preLoading) return <Loader />;
  return (
    <div>
      <div className="space-y-3">
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
              href: "/admin/my-store",
            },
            {
              title: "Edit Product",
            },
          ]}
        />
        <div className="py-10 flex flex-col justify-center bg-[#ffffff] rounded-xl">
          <div className="2xl:container">
            <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2">
              <form className="space-y-6">
                <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0 ">
                  <div className="px-3">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#0f280a]">
                      Product Image
                    </label>
                    <div className="flex flex-col justify-center items-center text-center">
                      <Image
                        src={productImgUrl}
                        alt="profile pic"
                        className="h-52 w-36 rounded-xl object-center object-cover"
                        height={144}
                        width={144}
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <UploadButton
                      className="bg-green-600 py-1 sm:py-3 sm:px-3  text-black rounded-lg"
                      endpoint="imageUploader"
                      appearance={{
                        button: {
                          background: "#22C55E",
                          padding: "2rem",
                          color: "#000",
                          width: "100%",
                        },
                        container: {
                          display: "flex",
                          background: "transparent",
                        },
                      }}
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
                      className="block mb-2 text-sm font-medium text-[#0f280a]  ">
                      Product Title
                    </label>
                    <input
                      id="message"
                      className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                      placeholder={title || "Enter the product title"}
                      onChange={(e) => setTitle(e.target.value)}></input>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-[#0f280a]">
                      Product Sub-title
                    </label>
                    <input
                      id="message"
                      className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                      placeholder={subTitle || "Enter the product sub-title"}
                      onChange={(e) => setSubTitle(e.target.value)}></input>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]">
                    Product Description
                  </label>
                  <textarea
                    id="message"
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                    placeholder={description || "Enter the product description"}
                    rows={6}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]">
                    Upload File
                  </label>
                  <Upload
                    {...props}
                    className="flex flex-col py-6 border rounded-lg items-center justify-center text-center text-[#0f280a] bg-[#F1F5F9]">
                    <p className="ant-upload-text text-center font-medium">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint text-center font-medium">
                      Supports single or bulk uploads of digital assets (ZIP,
                      RAR, PDF).
                    </p>
                  </Upload>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]">
                    Uploaded URLS
                  </label>
                  {urls.map((url: any) => (
                    <div className="grid grid-flow-col grid-cols-12 space-x-5 w-full justify-between">
                      <Link href={url.url} className=" col-span-11">
                        <div className="mt-3 w-full">
                          <div className="bg-[#f1f5f9] w-full text-gray-900 text-sm rounded-lg  focus:border-green-500 block  p-2.5">
                            {url.name}
                          </div>
                        </div>
                      </Link>
                      <button
                        data-product-key={url.key}
                        onClick={(e) => handleDelete(e)}
                        className="col-span-1 items-center flex">
                        <svg
                          fill="#000000"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="20"
                          height="20"
                          viewBox="0 0 482.428 482.429"
                          xmlSpace="preserve">
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
                  ))}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]">
                    Product Price
                  </label>
                  <input
                    id="number"
                    disabled
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5"
                    placeholder={"Free"}
                    onChange={(e) => setPrice(e.target.value)}></input>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]">
                    Checkout Button Text
                  </label>
                  <input
                    id="number"
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5"
                    placeholder={buttonText || "Enter the checkout button text"}
                    onChange={(e) => setButtonText(e.target.value)}></input>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className=" bg-[#22C55E]   text-[#ffffff] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-green-600 font-medium  "
                    onClick={(e) => handleSubmit(e)}>
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>

              <div className="hidden lg:block">
                <div className="flex flex-col items-center">
                  <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 hover:shadow-lg bg-transparent hover:border border border-[#d1d5db] hover:border-green-600">
                    <div className="grid-cols-2">
                      <div className="flex items-center  justify-center p-4">
                        <Image
                          src="https://res.cloudinary.com/dpscigyio/image/upload/f_auto,q_auto/bwz0zfstfaxgjwslcmho"
                          alt="book"
                          height={400}
                          width={400}
                          className="h-24 w-24 "
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <h6 className="block font-sans text-lg font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                            {title}
                          </h6>
                        </div>
                        <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased text-left">
                          {subTitle}
                        </p>
                      </div>
                      <div className="p-6 pt-3">
                        <Link
                          className="block w-full select-none rounded-lg bg-green-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white   transition-all hover:bg-green-600  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          href={{
                            pathname: "/checkout",
                            query: {
                              heading: subTitle,
                              subheading: subTitle,
                              description: subTitle,
                              pricing: subTitle,
                            }, // the user
                          }}>
                          {buttonText}
                        </Link>
                      </div>
                    </div>
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
