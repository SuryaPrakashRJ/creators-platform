"use client";
import Image from "next/image";
import { UploadButton } from "@/src/types/uploadthing";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useRouter } from "next/navigation";
export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [buttonText, setButtonText] = useState("Buy Now");
  const [fileUrl, setFileUrl] = useState<any>([]);
  const [loading, setLoading] = useState(false);
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
          heading:title,
          subheading:subTitle,
          productImgLink:productImgUrl,
          description,
          pricing:Number(price),
          buttonTitle:buttonText,
          downloadable:true,
          fileUrl:JSON.stringify(fileUrl),
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
  // const socialLinks = user.data.socialMediaLinks;

  const { Dragger } = Upload;

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
        if(info.fileList.length > 0){
          setFileUrl(info.fileList.map((file) => file.response.message[0].Location));
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  console.log(fileUrl[1]);
  return (
    <div>
      <div className="py-10 flex flex-col justify-center bg-[#ffffff] rounded-xl">
        <div className="2xl:container">
          <div className="w-[90%] mx-auto grid grid-cols-1">
            <form className="space-y-6">
              <div className="flex sm:flex-row flex-col">
                <div className="px-3">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Product Image
                  </label>
                  <div className="flex flex-col justify-center items-center text-center">
                    <Image
                      src={productImgUrl || "/default-book.jpg"}
                      alt="profile pic"
                      className="h-52 w-36 rounded-xl object-center object-cover"
                      height={144}
                      width={144}
                    />
                  </div>
                </div>

                <div className="">
                  <UploadButton
                  className="bg-green-600 py-3 px-3  text-[#ffffff] rounded-lg"
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
                  
                  <p className="ant-upload-text text-center">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint text-center">
                    Support for a single or bulk (multiple) upload. <br/> Strictly prohibited
                    from uploading company data or other banned files.
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
                  className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5"
                  placeholder={"Enter the product price"}
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
                  placeholder={"Enter the checkout button text"}
                  onChange={(e) => setButtonText(e.target.value)}
                ></input>
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
    </div>
  );
}
