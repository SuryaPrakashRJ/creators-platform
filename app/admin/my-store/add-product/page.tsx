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
export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [productImgUrl, setProductImgUrl] = useState(
    "https://res.cloudinary.com/dpscigyio/image/upload/f_auto,q_auto/bwz0zfstfaxgjwslcmho"
  );
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [buttonText, setButtonText] = useState("Buy Now");
  const [fileUrl, setFileUrl] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<any>('');
  const { user } = useAuth();
  const router = useRouter();
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

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action:
      "https://creators-platform-backend-production.up.railway.app/api/v1/file/upload",
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
            title: "Add Product",
          },
        ]}
      />
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize px-5 py-3 rounded-lg shadow-lg w-full flex text-left bg-[#ffffff] text-lg font-semibold "
            >
              Select Product  {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="bg-white font-semibold text-[#0f280a]"
            disabledKeys={[
              "Custom-Product",
              "Webinar",
              "eCourse",
              "Book-a-Time-on-Your-Calendar",
              "External-Link",
              "Creator Card Affliate Program",
            ]}
          >
            <DropdownItem key="> Digital Product">Digital Product</DropdownItem>
            <DropdownItem key="External-Link" className="text-[#808080]">
              External Link (Affliate Links)
            </DropdownItem>
            <DropdownItem key="Custom-Product" className="text-[#808080]">
              Custom Product
            </DropdownItem>
            <DropdownItem
              key="Book-a-Time-on-Your-Calendar"
              className="text-[#808080]"
            >
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
              className="text-[#808080]"
            >
              Creator Card Affliate Program
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

{
  (selectedValue === "> Digital Product") && (
    
    <div className="py-10 flex flex-col justify-center bg-[#ffffff] rounded-xl">
    <div className="2xl:container">
      <div className="w-[90%] mx-auto grid grid-cols-1">
        <form className="space-y-6">
          <div className="flex sm:flex-row flex-col space-y-3 sm:space-y-0">
            <div className="px-3">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-[#0f280a]"
              >
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
                  }}}
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
                placeholder={"Enter the product title"}
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
                placeholder={"Enter the product sub-title"}
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
              placeholder={"Enter the product description"}
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
              <p className=" text-center font-medium">
                Click or drag file to this area to upload
              </p>
              <p className=" text-center font-medium">
              Supports single or bulk uploads of digital assets (ZIP, RAR, PDF).
              </p>
            </Upload>
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
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-normal text-[#0f280a]"
            >
              Payments feature will be added very soon!
            </label>
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
              placeholder={"Enter the checkout button text"}
              onChange={(e) => setButtonText(e.target.value)}
            ></input>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-normal text-[#0f280a]"
            >
              Default text is "Buy Now" which is used for checkout button.
            </label>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className=" bg-[#22C55E]   text-[#ffffff] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-green-600 font-medium  "
              onClick={handleSubmit}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
    </div>
  );
}
