"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
type FormErrors = {
  name?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
  confirm_password?: string[];
};
import * as z from "zod";
import Image from "next/image";

const userSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid Email"),
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(1, "Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
  });

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submitting");
    setLoading(true);
    const validationResult = userSchema.safeParse({
      email,
      name,
      username,
      password,
      confirm_password: confirmPassword,
    });

    if (!validationResult.success) {
      // Set the form errors
      setFormErrors(validationResult.error.formErrors.fieldErrors);
      setLoading(false);
      return; // Exit early if there are validation errors
    }

    const validusername = username.toLowerCase();
    console.log(validusername);
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username: validusername,
        email,
        password,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.message === "Success") {
      localStorage.setItem("userId", data.user.id);
      router.push("/sign-in");
    }
    if (data.message === "User Name already exists") {
      toast({
        title: "User Already Exists",
        description: "Check your details and try again",
        variant: "destructive",
      });
    }
    if (data.message === "Email already exists") {
      toast({
        title: "Email Already Exists",
        description: "Check your details and try again",
        variant: "destructive",
      });
    }
    if (data.message === "Error") {
      toast({
        title: "Oops! Something Went Wrong",
        description: "Check your details and try again",
        variant: "destructive",
      });
    }
  };
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  function togglePasswordVisibility(event: any) {
    event.preventDefault();
    setPasswordHidden(!isPasswordHidden);
  }
  return (
    <>
      <section className="flex flex-col justify-center w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 w-full my-5 lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <a href="/" className="flex items-center text-center w-full space-x-2">
                <Image
                  src="https://res.cloudinary.com/dsdieyzkw/image/upload/v1695366242/zello/twokac3pyfcy4zl9h7xy.png"
                  width={40}
                  height={40}
                  alt="logo"
                />
                <span className="text-xl font-bold  tracking-tight text-gray-900 md:text-2xl flex flex-col text-left -space-y-3 space-x-0.5">
                  <span className="justify-center text-[24px]">
                    CreatorCard
                  </span>
                  <span className=" text-[12px]">Beta</span>
                </span>
              </a>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Username
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className={`bg-gray-50 border ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="your username"
                    onChange={(e: any) => setUsername(e.target.value)}
                    required
                  />
                  {formErrors.username && (
                    <p className="text-red-500">{formErrors.username[0]}</p>
                  )}
                  <p className="text-[14px] text-center">
                    This will be used as creatorcard.io/username, you can also
                    modify it later.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className={`bg-gray-50 border ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="Name"
                    onChange={(e: any) => setName(e.target.value)}
                    required
                  />
                  {formErrors.name && (
                    <p className="text-red-500">{formErrors.name[0]}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-gray-50 border ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="name@email.com"
                    onChange={(e: any) => setEmail(e.target.value)}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500">{formErrors.email[0]}</p>
                  )}
                </div>
                <div>
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
                      className={`bg-gray-50 border ${
                        formErrors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      onChange={(e: any) => setPassword(e.target.value)}
                      required
                    />
                    {formErrors.password && (
                      <p className="text-red-500">{formErrors.password[0]}</p>
                    )}
                  </div>
                </div>

                <div>
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
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      onChange={(e: any) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {formErrors.confirm_password && (
                      <p className="text-red-500">
                        {formErrors.confirm_password[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 "
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline "
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#052E17] hover:bg-[#272726] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={handleSubmit}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <a
                    href="/sign-in"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
