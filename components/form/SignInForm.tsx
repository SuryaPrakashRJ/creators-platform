"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"


export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

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
      })
    } else {
      router.refresh()
      router.push("/admin");
    }
  };
  return (
    <section className=" flex h-screen justify-center w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 w-full md:h-screen lg:py-0">
        
        <div className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-white border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <a href='/' className="flex items-center text-center w-full">
            <span className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              CreatorCard
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
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border  sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-400 placeholder-gray-400  "
                  onChange={(e: any) => setPassword(e.target.value)}
                  required
                />
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
