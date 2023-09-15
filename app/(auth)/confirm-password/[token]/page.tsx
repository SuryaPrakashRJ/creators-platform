"use client";

interface User {
    id: string;
    user: User;
    name: string;
    email: string;
    bio: string | null;
    createdAt: string;
    emailVerified: boolean;
    hashedPassword: string;
    image: string | null;
    updatedAt: string;
    // add any other properties if needed
}
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function ConfirmPassword({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  console.log(token);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
    const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  useEffect(() => {
    fetch(`/api/user/change-password/${token}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        setUser(data);
        console.log(data);
    })
    .catch(error => {
        console.error("Error fetching the user:", error);
        router.push('/sign-in')
    });
  
    }, []);

    

  const handleSubmit = async (e: any) => {
   
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setErrorPass(true);
      setLoading(false);
    }
    const res = await fetch("/api/user/change-password/update", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id:user?.user.id,
            password,
            token,
        }),

  });
  const data = await res.json();
  if (data.message === "Success") {
    console.log(data);
    router.push("/sign-in");
  }
  if (data.message === "Error") {
    toast({
      title: "Error Adding Details",
      description: "Check your details and try again",
      variant: "destructive",
    });
  }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          New Password
        </label>
        <input
          type="password"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="name@email.com"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <label
          htmlFor="helper-text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="helper-text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="name@email.com"
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
        {errorPass && <p className="text-red-500">Password does not match</p>}
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

