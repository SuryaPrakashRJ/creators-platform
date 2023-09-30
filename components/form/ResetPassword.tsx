"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
export default function ResetPassword() {
    const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        }),
    })
    const data = await res.json();
    setLoading(false);
    if (data.message === "Success") {
      toast({
        title: "Check your email",
        description: "Check your email to change your password",
      })
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } else if (data.message === "Email does not exist") {
      toast({
        title: "Email does not exist",
        description: "Please enter a valid email",
      })
    }
    else {
      toast({
        title: "Error",
        description: "Something went wrong",
      })
    }
    }
  return (
    // <div>
    // <form onSubmit={handleSubmit}>
    // <label
    //     htmlFor="helper-text"
    //     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //   >
    //     Your email
    //   </label>
    //   <input
    //     type="email"
    //     id="helper-text"
    //     aria-describedby="helper-text-explanation"
    //     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    //     placeholder="name@email.com"
    //     onChange={
    //         (e: any) => setEmail(e.target.value)
    //     }
    //   />
    //   <button
    //     type="submit"
    //     className=" mt-3 text-black bg-gray-50    font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    //   >
    //     {loading ? "Submitting..." : "Submit"}
    //   </button>
    // </form> 
    // </div>

    <div className="bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-lg">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center">
          <a
            href="/"
            className="mb-8 inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
            aria-label="logo"
          >
            <img
              src="https://res.cloudinary.com/dsdieyzkw/image/upload/v1695366242/zello/twokac3pyfcy4zl9h7xy.png"
              width={40}
              height={40}
              alt="logo"
            />
            CreatorCard
          </a>

          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            Password Reset
          </h1>

          <p className="mb-6 max-w-screen-md text-center text-gray-500 md:text-lg">
            Enter mail to receive password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative max-w-xs">
              <svg
                className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
                id="helper-text"
                aria-describedby="helper-text-explanation"
                onChange={
                    (e) => setEmail(e.target.value)
                }
                
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              <button
                type="submit"
                className=" mt-3 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>

          <a
            href="/"
            className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            back
          </a>
        </div>
      </div>
    </div>
  );
}
