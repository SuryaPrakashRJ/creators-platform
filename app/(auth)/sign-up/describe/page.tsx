"use client";

import "@uploadthing/react/styles.css";
import { UploadButton } from "@/src/types/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";


const page = () => {
  const [picUrl, setPicUrl] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { url: "", platform: "", open: false, value: "" },
    
  ]);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(`/api/user/addDetails`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          picUrl,
          socialMediaLinks,
          userId,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.message === "Success") {
        localStorage.removeItem("userId");
        router.push("/sign-in");
      }
      if (data.message === "Error") {
        toast({
          title: "Error Adding Details",
          description: "Check your details and try again",
          variant: "destructive",
        });
      }

      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error appropriately in your UI
    }
  };

  const addNewLink = (e: any) => {
    e.preventDefault();
    const lastLink = socialMediaLinks[socialMediaLinks.length - 1];
    if (lastLink.url !== "") {
      setSocialMediaLinks([...socialMediaLinks, { platform: "", url: "", open: false, value: "" }]);
    } else {
      toast({
        title: "Add Link",
        description: "Add the previous link first",
        variant: "destructive",
      });
    }
  };

  const handleUrlChange = (e: any, index: number) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index].url = e.target.value;
    setSocialMediaLinks(updatedLinks);
  };

  const handleValueChange = (value: string, index: number) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index].value = value;
    setSocialMediaLinks(updatedLinks);
  };
  const handleOpenChange = (isOpen: boolean, index: number) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index].open = isOpen;
    setSocialMediaLinks(updatedLinks);
  };
  

  const setPlatform = (value: any, index: number) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index].platform = value;
    setSocialMediaLinks(updatedLinks);
  };

  const [open, setOpen] = useState(false);
  const frameworks = [
    {
      value: "instagram",
      label: "Instagram",
    },
    {
      value: "facebook",
      label: "Facebook",
    },
    {
      value: "x",
      label: "X",
    },
    {
      value: "youtube",
      label: "Youtube",
    },
    {
      value: "linkedin",
      label: "LinkedIn",
    },
    {
      value: "website",
      label: "Website",
    },
  ];

  console.log(socialMediaLinks);
  return (
    <div className=" bg-gray-900 h-screen flex flex-col justify-center">
      <div className="2xl:container">
        <div className="w-[90%] mx-auto grid grid-cols-1">
          <form className="space-y-6">
            <div>
              {picUrl && (
                <div className="">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your Uploaded Picture
                  </label>
                  <div className="flex flex-col justify-center items-center text-center">
                    <Image
                      src={picUrl}
                      alt="profile pic"
                      className="w-36 h-36 rounded-xl object-center object-cover"
                      height={144}
                      width={144}
                    />
                  </div>
                </div>
              )}
              <div className="">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Upload Your Display Picture
                </label>

                <UploadButton
                  endpoint="imageUploader"

                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    const url = res?.[0].url || "";
                    setPicUrl(url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />

              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your Bio
              </label>
              <textarea
                id="message"
                className="block p-2.5 w-full text-sm  rounded-lg border bg-gray-700  placeholder-gray-400 text-white focus:border-white"
                placeholder="Write your thoughts here..."
                rows={6}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white"
              >
                Add Social Links
              </label>
              <div>
                {socialMediaLinks.map((link, index) => (
                  <div
                    key={index}
                    className="grid grid-flow-col lg:grid-cols-10 xl:grid-cols-12 gap-2 mt-2"
                  >
                    <div className="col-span-1">
                      <Popover
                        open={link.open}
                        onOpenChange={(isOpen) =>
                          handleOpenChange(isOpen, index)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[6rem]"
                          >
                            {link.value
                              ? frameworks.find(
                                  (framework) => framework.value === link.value
                                )?.label
                              : "Select"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search"
                              className="h-9"
                            />
                            <CommandEmpty>Not found</CommandEmpty>
                            <CommandGroup>
                              {frameworks.map((framework) => (
                                <CommandItem
                                  key={framework.value}
                                  onSelect={(currentValue: any) => {
                                    handleValueChange(currentValue, index);
                                    setPlatform(currentValue, index);
                                    handleOpenChange(false, index);
                                  }}
                                >
                                  {framework.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      link.value === framework.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="col-span-11">
                      <Input
                        type="url"
                        placeholder="Your Social Media link"
                        className="bg-transparent text-white"
                        value={link.url}
                        onChange={(e) => handleUrlChange(e, index)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="ghost"
                  className="border bottom-2 border-white text-white w-full sm:w-96 md:w-60 "
                  onClick={addNewLink}
                >
                  Add Links
                </Button>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className=" text-black bg-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                onClick={handleSubmit}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
