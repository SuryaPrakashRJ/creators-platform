"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import { useToast } from "@/components/ui/use-toast"


export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorPass, setErrorPass] = useState(false);
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const router = useRouter();

   

    const handleSubmit = async(e:any) => {
        e.preventDefault();
setLoading(true);
        if(password !== confirmPassword){
            setErrorPass(true);
            return;
        }
        
        const res = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:username,
                email,
                password,
                confirm_password:confirmPassword,
                country
            })
        })
        const data = await res.json();
        console.log(data);
        setLoading(false);
        if (data.message === "Success") {
            router.push("/sign-in");
        }
        if (data.message === "User Name already exists") {
          toast({
            title: "User Already Exists",
            description: "Check your details and try again",
            variant: "destructive",
          })
        }
        if (data.message === "Email already exists") {
          toast({
            title: "Email Already Exists",
            description: "Check your details and try again",
            variant: "destructive",
          })
      }
      if (data.message === "Error") {
        toast({
          title: "Oops! Something Went Wrong",
          description: "Check your details and try again",
          variant: "destructive",
        })
    }
    
    }
  return (
    <section className=" bg-gray-900 h-screen flex w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 w-full md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Rahul M"
                  onChange={(e:any)=>(setUsername(e.target.value))}
                  required
                />
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  onChange={(e:any)=>(setEmail(e.target.value))}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={(e:any)=>(setPassword(e.target.value))}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  onChange={(e:any)=>(setConfirmPassword(e.target.value))}
                  required
                />
              </div>
              {errorPass && <p className="text-red-500">Password does not match</p>}
              <div>
              <label
                htmlFor="countries"
                className="block text-sm font-medium text-gray-900 "
              >
                Select an option
              </label>
              <select
                id="countries"
                onChange={(e:any)=>(setCountry(e.target.value))}
                defaultValue={country}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option hidden>Choose a country</option>
                <option value="India">India</option>
                <option value="US">United States</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
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
                className="w-full text-white bg-[#111827] hover:bg-[#272726] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
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
  );
}
