// "use client";

// interface User {
//     id: string;
//     user: User;
//     name: string;
//     email: string;
//     bio: string | null;
//     createdAt: string;
//     emailVerified: boolean;
//     hashedPassword: string;
//     image: string | null;
//     updatedAt: string;
//     // add any other properties if needed
// }
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "@/components/ui/use-toast";

// export default function ConfirmPassword({
//   params,
// }: {
//   params: { token: string };
// }) {
//   const { token } = params;
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [errorPass, setErrorPass] = useState(false);
//     const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

  

//   useEffect(() => {
//     fetch(`/api/user/change-password/${token}`)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         setUser(data);
//     })
//     .catch(error => {
//         console.error("Error fetching the user:", error);
//         router.push('/sign-in')
//     });
  
//     }, []);

    

//   const handleSubmit = async (e: any) => {
   
//     e.preventDefault();
//     setLoading(true);
//     if (password !== confirmPassword) {
//       setErrorPass(true);
//       setLoading(false);
//     }
//     const res = await fetch("/api/user/change-password/update", {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             id:user?.user.id,
//             password,
//             token,
//         }),

//   });
//   const data = await res.json();
//   if (data.message === "Success") {
//     toast({
//       title: "Password Changed",
//       description: "You can now login with your new password",
//     })
//     router.push("/sign-in");
//   }
//   if (data.message === "Error") {
//     toast({
//       title: "Error Adding Details",
//       description: "Check your details and try again",
//       variant: "destructive",
//     });
//   }
// }

//   const [isPasswordHidden, setPasswordHidden] = useState(true)
//   return (
     
//     <div className='flex flex-col items-center justify-center py-28 rounded-lg' >


//     <div className="bg-white py-6 sm:py-8 lg:py-12 rounded-lg shadow-lg">
//       <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
//         <div className="flex flex-col items-center">
//           <a
//             href="/"
//             className="mb-8 inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl"
//             aria-label="logo"
//           >
//             <img
//               src="https://res.cloudinary.com/dsdieyzkw/image/upload/v1695366242/zello/twokac3pyfcy4zl9h7xy.png"
//               width={40}
//               height={40}
//               alt="logo"
//             />
//             CreatorCard
//           </a>

//           <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
//             Password Reset
//           </h1>

//           <p className="mb-6 max-w-screen-md text-center text-gray-500 md:text-lg">
//             Enter mail to receive password reset link.
//           </p>

//           <form onSubmit={handleSubmit}>


//           <div>
           
//             <div className="relative max-w-xs mt-2">
//                 <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
//                     onClick={() => setPasswordHidden(!isPasswordHidden)}
//                 >
//                     {
//                         isPasswordHidden ? (
//                             <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             </svg>
//                         ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                             </svg>

//                         )
//                     }
//                 </button>
//                 <input
//                     type={isPasswordHidden ? "password" : "text"}
//                     placeholder="Enter your password"
//                     className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//                 />
//             </div>
//         </div >


//         <div>
            
//             <div className="relative max-w-xs mt-2">
//                 <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
//                     onClick={() => setPasswordHidden(!isPasswordHidden)}
//                 >
//                     {
//                         isPasswordHidden ? (
//                             <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             </svg>
//                         ) : (
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
//                             </svg>

//                         )
//                     }
//                 </button>
//                 <input
//                     type={isPasswordHidden ? "password" : "text"}
//                     placeholder="Retype password"
//                     className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//                 />
//             </div>
//         </div >

//             <div className="flex flex-wrap items-center justify-center gap-3 py-4">
//               <button
//                 type="submit"
//                 className=" mt-3 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>

//           <a
//             href="/"
//             className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
//           >
//             back
//           </a>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

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
    toast({
      title: "Password Changed",
      description: "You can now login with your new password",
    })
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

  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <label
  //         htmlFor="helper-text"
  //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //       >
  //         New Password
  //       </label>
  //       <input
  //         type="password"
  //         id="helper-text"
  //         aria-describedby="helper-text-explanation"
  //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
  //         placeholder="••••••••"
  //         onChange={(e: any) => setPassword(e.target.value)}
  //       />
  //       <label
  //         htmlFor="helper-text"
  //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //       >
  //         Confirm Password
  //       </label>
  //       <input
  //         type="password"
  //         id="helper-text"
  //         aria-describedby="helper-text-explanation"
  //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
  //         placeholder="••••••••"
  //         onChange={(e: any) => setConfirmPassword(e.target.value)}
  //       />
  //       {errorPass && <p className="text-red-500">Password does not match</p>}
  //       <button
  //         type="submit"
  //         className=" mt-3 text-black bg-gray-50    font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  //       >
  //         {loading ? "Submitting..." : "Submit"}
  //       </button>
  //     </form>
  //   </div>
  // );

  const [isPasswordHidden, setPasswordHidden] = useState(true)

  function togglePasswordVisibility(event: any) {
    event.preventDefault();
    setPasswordHidden(!isPasswordHidden);
  }

return (
     
  <div className='flex flex-col items-center justify-center py-28 rounded-lg' >


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

        <form >


        <div>
         
          <div className="relative max-w-xs mt-2">
              <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                  onClick={togglePasswordVisibility}
              >
                  {
                      isPasswordHidden ? (
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>

                      )
                  }
              </button>
              <input
                       type={isPasswordHidden ? "password" : "text"}
                       placeholder="Retype password"
                       id="helper-text"
                       aria-describedby="helper-text-explanation"
                       onChange={(e: any) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
              />
          </div>
      </div >


      <div>
          
          <div className="relative max-w-xs mt-2">
              <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                   onClick={togglePasswordVisibility}
            >
                  {
                      isPasswordHidden ? (
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>

                      )
                  }
              </button>
              <input
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Retype password"
                  id="helper-text"
                  aria-describedby="helper-text-explanation"
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
                  className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-green-600 shadow-sm rounded-lg"
              />
          </div>
          {
              errorPass && <p className="text-red-500">Password does not match</p>
          }
      </div >

          <div className="flex flex-wrap items-center justify-center gap-3 py-4">
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
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
  </div>
  );
}

