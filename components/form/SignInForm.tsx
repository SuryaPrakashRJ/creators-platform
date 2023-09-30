"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const signInData = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    setLoading(false);
    if (signInData?.error) {
      toast({
        title: "Oops! Something Went Wrong",
        description: "Check your credentials and try again",
        variant: "destructive",
      });
    } else {
      router.refresh();
      router.push("/admin");
    }
  };

  const [isPasswordHidden, setPasswordHidden] = useState(true);

  function togglePasswordVisibility(event: any) {
    event.preventDefault();
    setPasswordHidden(!isPasswordHidden);
  }
  return (
    <section className=" flex h-screen justify-center w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 w-full md:h-screen lg:py-0">
        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <a href="/" className="flex items-center text-center w-full space-x-2">
              <Image
                src="https://res.cloudinary.com/dsdieyzkw/image/upload/v1695366242/zello/twokac3pyfcy4zl9h7xy.png"
                width={40}
                height={40}
                alt="logo"/>
              <span className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl flex flex-col text-left -space-y-3 space-x-0.5">
                <span className="justify-center text-[24px]">CreatorCard</span>
                <span className=" text-[12px]">Beta</span>
              </span>
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xltext-white">
              Login into your account
            </h1>
            <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border  sm:text-sm rounded-lg  block w-full p-2.5 bg-white "
                  placeholder="name@gmail.com"
                  onChange={(e: any) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  text-gray-900"
                >
                  Password
                </label>
                 <div className="relative mt-2">
                  <button
                    className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordHidden ? (
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </button>
                  <input
                    type={isPasswordHidden ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className=" border  sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-400 placeholder-gray-400  "
                    onChange={(e: any) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#052E17] hover:bg-[#272726] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                {loading ? "Logging In..." : "Login"}
              </button>

              <a
                href="/reset-password"
                className="font-semibold  flex justify-center  text-gray-600 hover:underline text-primary-500 "
              >
                Forgot Password?
              </a>

              <p className="text-sm font-light  text-gray-400">
                Don&apos;t have an account yet?{" "}
                <a
                  href="/sign-up"
                  className="font-medium  text-primary-600 hover:underline text-primary-500"
                >
                  Register here
                </a>
              </p>
            </form>
            {/* <GoogleButton onClick={() =>signIn("google")} className="mx-auto"/> */}
          </div>
        </div>
      </div>
    </section>
  );
}
