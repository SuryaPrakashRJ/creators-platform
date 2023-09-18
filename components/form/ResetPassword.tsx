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
    <div>
    <form onSubmit={handleSubmit}>
    <label
        htmlFor="helper-text"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your email
      </label>
      <input
        type="email"
        id="helper-text"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder="name@email.com"
        onChange={
            (e: any) => setEmail(e.target.value)
        }
      />
      <button
        type="submit"
        className=" mt-3 text-black bg-gray-50    font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form> 
    </div>
  );
}
