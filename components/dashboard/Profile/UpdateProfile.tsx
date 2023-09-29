"use client";
import Image from "next/image";
import { UploadButton } from "@/src/types/uploadthing";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
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
import { Breadcrumb } from "antd";

export default function UpdateProfile() {
  const { user } = useAuth();
  console.log(user);
  const [name, setName] = useState(user?.data.name);
  const [username, setUsername] = useState(user?.data.username);
  const [picUrl, setPicUrl] = useState(user?.data.image);
  const [bio, setBio] = useState(user?.data.bio);
  const [loading, setLoading] = useState(false);
  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { url: "", platform: "", open: false, value: "" },
  ]);

  useEffect(() => {
    if (user && typeof user.data.socialMediaLinks === "string") {
      setSocialMediaLinks(JSON.parse(user.data.socialMediaLinks));
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const hasEmptyField = socialMediaLinks.some(
      (link) => link.url === "" || link.platform === "" || link.value === ""
    );

    if (hasEmptyField) {
      console.log("has empty field");
      toast({
        title:"Incomplete Links",
        description:
          "Please fill in all fields for your social media links before submitting.",
      });
      setLoading(false);
      return; // Exit early from the function
    }
    const validusername = username.toLowerCase();
    const res = await fetch(
      `https://creators-platform-backend-production.up.railway.app/api/v1/users/${user?.data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name,
          username: validusername,
          image: picUrl,
          bio: bio,
          socialMediaLinks: JSON.stringify(socialMediaLinks),
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    setLoading(false);
    if (data.message === "Success") {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated",
      });
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };
  console.log(user);

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
      value: "github",
      label: "Github",
    },
    {
      value: "dribbble",
      label: "Dribbble",
    },
    {
      value: "behance",
      label: "Behance",
    },
    {
      value: "tiktok",
      label: "Tiktok",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "website",
      label: "Website",
    },
  ];
  const addNewLink = (e: any) => {
    e.preventDefault();
    const lastLink = socialMediaLinks[socialMediaLinks.length - 1];
    if (lastLink.url !== "") {
      setSocialMediaLinks([
        ...socialMediaLinks,
        { platform: "", url: "", open: false, value: "" },
      ]);
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

  const handleDelete = (index: number) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks.splice(index, 1);
    setSocialMediaLinks(updatedLinks);
  };

  const setPlatform = (value: any, index: number) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index].platform = value;
    setSocialMediaLinks(updatedLinks);
  };

  console.log(socialMediaLinks);

  return (
    <div className="space-y-3">
      <Breadcrumb
        className="px-5 py-1  text-lg font-semibold "
        separator=">"
        items={[
          {
            title: "Admin",
            href: "/admin/dashboard",
          },

          {
            title: "Profile Settings",
          },
        ]}
      />
      <div className="py-10 flex flex-col justify-center bg-[#ffffff] rounded-xl ">
        <div className="2xl:container">
          <div className="w-[90%] mx-auto grid grid-cols-1">
            <form className="space-y-6">
              <div className="flex sm:flex-row flex-col">
                <div className="px-3">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Update Your Display Picture &#42;
                  </label>
                  <div className="flex flex-col  justify-center items-center text-center">
                    <Image
                      src={picUrl || user?.data.image}
                      alt="profile pic"
                      className="w-36 h-36 rounded-xl object-center object-cover"
                      height={144}
                      width={144}
                    />
                  </div>
                </div>

                <div className=" px-3  text-[#0f280a] flex items-end  rounded-lg">
                  <UploadButton
                    className="bg-green-600 py-3 px-3  text-black rounded-lg"
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
                      }}}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
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

              <div className="flex sm:flex-row flex-col justify-between sm:space-x-5 space-y-5 sm:space-y-0">
                <div className="w-full ">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a] "
                  >
                    Update Your Name &#42;
                  </label>
                  <input
                    id="message"
                    className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 "
                    placeholder={"Your Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-[#0f280a]"
                  >
                    Update Your Username &#42;
                  </label>
                  <input
                    id="message"
                    className="bg-[#f1f5f9]  hover:border-green-500 text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 dark:text-white"
                    placeholder={ "Your username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-[#0f280a]"
                > 
                  Update Your Bio &#42;
                </label>
                <textarea
                  id="message"
                  className="bg-[#f1f5f9]  hover:border-green-500 text-gray-900 text-sm rounded-lg  focus:border-green-500 block w-full p-2.5 dark:text-white "
                  placeholder={"Your Bio"}
                  value={bio}
                  rows={6}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium  text-[#0f280a]"
                >
                  Add Social Links &#42;
                </label>
                <div>
                  {socialMediaLinks.map((link: any, index: number) => (
                    <div
                      key={index}
                      className="grid grid-flow-col  lg:grid-cols-10 xl:grid-cols-12 mt-2 lg:space-x-10 xl:space-x-5"
                    >
                      <div className="col-span-1 ">
                        <Popover
                          open={link.open}
                          onOpenChange={(isOpen) =>
                            handleOpenChange(isOpen, index)
                          }
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="outline"
                              // aria-expanded={open}
                              className="w-[6rem] border-[#22C55E] text-[#22C55E] hover:text-[#ffffff] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-green-600"
                            >
                              {link.value
                                ? frameworks.find(
                                    (framework) =>
                                      framework.value === link.value
                                  )?.label
                                : "Select"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0 ">
                            <Command>
                              <CommandInput
                                placeholder="Search"
                                className="h-9 "
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
                      <div className="col-span-11 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <input
                          type="url"
                          placeholder="Your Social Media link"
                          className="bg-[#f1f5f9] text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:text-white"
                          value={link.url}
                          onChange={(e) => handleUrlChange(e, index)}
                        ></input>

                        <button
                          type="submit"
                          className="  border-[#c52232] border  text-[#c52232] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-[#c52232] hover:text-[#ffffff] font-medium "
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    variant="ghost"
                    className="bg-[#505050]   text-[#ffffff] rounded-lg text-sm text-center hover:bg-[#303030] hover:text-[#ffffff] font-medium  w-full sm:w-96 md:w-60 "
                    onClick={addNewLink}
                  >
                    Add Links 
                  </Button>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className=" bg-[#22C55E]   text-[#ffffff] rounded-lg text-sm px-5 py-2.5 text-center hover:bg-green-600 font-medium  "
                  onClick={handleSubmit}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
