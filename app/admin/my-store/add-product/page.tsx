"use client";
import Image from "next/image";
import { UploadButton } from "@/src/types/uploadthing";
import { useState, useMemo } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "antd";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function AddProduct() {
  const [title, setTitle] = useState("Get My [Template/eBook/Course] Now!");
  const [subTitle, setSubTitle] = useState("Short Description");
  const [productImgUrl, setProductImgUrl] = useState(
    "https://res.cloudinary.com/dpscigyio/image/upload/f_auto,q_auto/bwz0zfstfaxgjwslcmho"
  );
  const [description, setDescription] = useState(
    "This [Template/eBook/Course] will teach you everything you need to achieve your goals."
  );
  const [price, setPrice] = useState(0);
  const [buttonText, setButtonText] = useState("Buy Now");
  const [fileUrl, setFileUrl] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>("");
  const { user } = useAuth();
  const router = useRouter();

  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleBlur = () => {
    // Check if the input is empty when it loses focus
    setIsInputEmpty(title.trim() === "");
  };

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
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/digital_download/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: user.data.email,
          heading: title,
          subheading: subTitle,
          productImgLink: productImgUrl,
          description,
          pricing: Number(price),
          buttonTitle: buttonText,
          fileUrl: JSON.stringify(fileUrl),
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
      router.push("/admin/my-store");
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  const handleButtonClick = (event:any) => {
    event.preventDefault();
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action:
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/file/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        if (info.fileList.length > 0) {
          setFileUrl(
            info.fileList.map((file) => ({
              url: file.response.message[0].url,
              key: file.response.message[0].key,
              name: file.response.message[0].originalname,
            }))
          );
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  console.log(fileUrl);

  return (
    <div className="space-y-3 ">
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
            href: "/admin/my-store",
          },
          {
            title: "Add Product",
          },
        ]}
      />
      <div className=" bg-[#ffffff] rounded-lg ">
        <Dropdown >
          <DropdownTrigger>
        
            <Button
              variant="bordered"
              className="capitalize px-5 py-3 rounded-lg text-center  justify-start flex text-lg font-semibold ">
              {
                selectedValue === ""
                  ? "Select Product "
                  : selectedValue 
              }
              <svg
          className="hidden ml-3 fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
            </Button>
            
            
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="bg-white font-semibold text-[#0f280a] w-fit"
            disabledKeys={[
              "Custom-Product",
              "Webinar",
              "eCourse",
              "Book-a-Time-on-Your-Calendar",
              "External-Link",
              "Creator Card Affliate Program",
            ]}>
            <DropdownItem key="Digital Product" className="hover:bg-slate-100">Digital Product</DropdownItem>
            <DropdownItem key="External-Link" className="text-[#808080]">
              External Link (Affliate Links)
            </DropdownItem>
            <DropdownItem key="Custom-Product" className="text-[#808080]">
              Custom Product
            </DropdownItem>
            <DropdownItem
              key="Book-a-Time-on-Your-Calendar"
              className="text-[#808080]">
              Book a Time on Your Calendar
            </DropdownItem>
            <DropdownItem key="eCourse" className="text-[#808080]">
              eCourse
            </DropdownItem>
            <DropdownItem key="Webinar" className="text-[#808080]">
              Webinar
            </DropdownItem>
            <DropdownItem
              key="Creator Card Affliate Program"
              className="text-[#808080]">
              Creator Card Affliate Program
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {selectedValue === "Digital Product" && (
        <>
          <div className="2xl:container mx-auto">
            <div className="w-[100%] mx-auto grid grid-cols-1 lg:grid-cols-7">
              <div className="py-10 flex flex-col col-span-5 justify-center bg-[#ffffff] rounded-xl">
                <div className="2xl:container">
                  <div className="w-[90%] mx-auto grid grid-cols-1">
                    <form className="space-y-6">
                      <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0">
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
                              className="h-52 w-44 rounded-xl  object-cover "
                              height={164}
                              width={164}
                            />
                          </div>
                        </div>

                        <div className="flex items-end">
                          <UploadButton
                            className="bg-green-600 py-1 sm:py-3 sm:px-3  text-black rounded-lg "
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
                            className="block mb-2 text-sm font-medium text-[#0f280a]">
                            Product Title &#42;
                          </label>
                          <input
                            id="message"
                            className={`bg-[#f1f5f9] text-gray-900 text-sm rounded-lg p-2.5 ${
                              isInputEmpty
                                ? "border-red-900 border-solid"
                                : "focus:border-green-500"
                            }`}
                            placeholder={"Enter the product title"}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleBlur}
                            maxLength={50}
                            value={title}></input>
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-[#0f280a]">
                            Product Sub-title &#42;
                          </label>
                          <input
                            id="message"
                            className={`bg-[#f1f5f9] text-gray-900 text-sm rounded-lg p-2.5 ${
                              isInputEmpty
                                ? "border-red-900 border-solid"
                                : "focus:border-green-500"
                            }`}
                            placeholder={"Enter the product sub-title"}
                            onChange={(e) => setSubTitle(e.target.value)}
                            maxLength={100}
                            value={subTitle}></input>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-[#0f280a]">
                          Product Description &#42;
                        </label>
                        <textarea
                          id="message"
                          className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                          placeholder={"Enter the product description"}
                          rows={6}
                          onChange={(e) => setDescription(e.target.value)}
                          maxLength={300}
                          value={description}></textarea>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-[#0f280a]">
                          Upload File &#42;
                        </label>

                        <Upload
                          {...props}
                          className="flex flex-col py-6 border rounded-lg items-center justify-center text-center text-[#0f280a] bg-[#F1F5F9] hover:bg-[#E5EAEF] focus:bg-[#E5EAEF] transition-colors duration-300 ease-in-out">
                          <p className="text-center text-sm font-medium mb-4">
                            Click or drag a file to this area to upload
                          </p>
                          <p className="text-center text-sm font-medium mb-2">
                            Supports single or bulk uploads of digital assets
                            (ZIP, RAR, PDF)
                          </p>
                          <button onClick={handleButtonClick} className="bg-green-500 hover:bg-green-600 focus:bg-green-700 text-white font-satoshi font-medium py-2 px-4 rounded-full transition-colors duration-300 ease-in-out">Upload File</button>
                        </Upload>
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
                          ></input>
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-normal text-[#0f280a]">
                          Payments feature will be added very soon!
                        </label>
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-[#0f280a]">
                          Checkout Button Text &#42;
                        </label>
                        <input
                          id="number"
                          className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5"
                          placeholder={"Enter the checkout button text"}
                          onChange={(e) => setButtonText(e.target.value)}
                          maxLength={20}
                          value={buttonText}></input>
                      </div>

                      <div className="mt-5">
                        <button
                          type="submit"
                          className=" bg-[#22C55E]   text-[#ffffff] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-green-600 font-medium  "
                          onClick={handleSubmit}>
                          {loading ? "Adding..." : "Add"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block col-span-2">
                <div className="flex flex-col items-end">
                  <div className="relative flex w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 hover:shadow-lg bg-transparent hover:border border border-[#d1d5db] hover:border-green-600">
                    <div className="grid-cols-2">
                      <div className="flex items-center  justify-center p-4">
                        <Image
                          src={productImgUrl}
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
        </>
      )}
    </div>
  );
}
