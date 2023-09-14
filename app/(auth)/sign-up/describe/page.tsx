"use client";

import "@uploadthing/react/styles.css";
import { UploadButton } from "@/src/types/uploadthing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [picUrl, setPicUrl] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(`/api/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio,
          picUrl,
          userId,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.message === "Success") {
        localStorage.removeItem('userId');
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
  return (
    <div className=" bg-gray-900 h-screen flex flex-col justify-center">
      <div className="2xl:container">
        <div className="w-[90%] mx-auto grid grid-cols-1">
          <form onSubmit={handleSubmit}>
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
                    <img
                      src={picUrl}
                      alt="profile pic"
                      className="w-36 h-36 rounded-xl"
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
                <div></div>
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
                className="block p-2.5 w-full text-sm  rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your thoughts here..."
                rows={10}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className=" text-black bg-white  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
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
