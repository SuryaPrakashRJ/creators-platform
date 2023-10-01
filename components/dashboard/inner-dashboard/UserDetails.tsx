'use client'
import { useAuth } from "@/hooks/useAuth";
import { useEffect,useState } from "react";
import Link from "next/link";
import Loader from "@/components/dashboard/common/Loader";
import { BsGlobe2 } from "react-icons/bs";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
} from "react-icons/fa";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
export default  function UserDetails() {
const {user} =  useAuth()
const [userData , setUserData] = useState<any>("")
const [loading , setLoading] = useState(true)
useEffect(() => {
  if (user) {
    setUserData(user.data)
    setTimeout(() => {
        setLoading(false)
    },500)
  }
},[user])

let socialLinks = null
let hashtags = null
if(userData.socialMediaLinks){
    socialLinks = JSON.parse(userData.socialMediaLinks);
   }
if(userData.hashtags){
    hashtags = JSON.parse(userData.hashtags);
}
if(loading) return <Loader />
  return (
    <div className="mx-auto max-w-screen-2xl rounded-lg ">
      <div className="mx-auto max-w-242.5">
      {(userData.emailVerified === false) && (
        <div className="px-5 py-3 rounded-lg  bg-[#ffffff] text-lg font-semibold mb-3">
        <p className="text-red-500">Kindly verify your email! Please check your inbox</p>
        </div>
      )}
      {(userData.socialMediaLinks === null || userData.hashtags === '[{"hashtag":""}]') && (
        <div className="px-5 py-3 rounded-lg bg-[#ffffff] text-md font-semibold mb-3">
        <p className="text-black">Update your store profile</p>
        </div>
      )}
        <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="relative z-20 h-35 md:h-65">
            <img
              src="https://demo.tailadmin.com/src/images/cover/cover-01.png"
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-green-500 py-1 px-2 text-sm font-medium text-white hover:bg-green-600 xsm:px-4"
              >
              
                <Link href='/admin/settings'><span>Edit Profile</span></Link>
              </label>
              
            </div>
            
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2 ">
                <img src={userData.image} alt="profile" className="rounded-full"/>
                {/* <label
                        htmlFor="profile"
                        className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 sm:bottom-2 sm:right-2"
                      >
                        <svg
                          className="fill-current"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                            fill=""
                          />
                        </svg>
                        <input
                          type="file"
                          name="profile"
                          id="profile"
                          className="sr-only"
                        />
                      </label> */}
                       
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-medium text-black dark:text-white">
                {userData.name}
              </h3>
              {(socialLinks) &&(
              <div className="flex flex-row space-x-3  w-full justify-center">
              {Array.isArray(socialLinks) &&
                socialLinks.map((link: any, index: number) => (
                  <div key={index}>
                    {link.value === "youtube" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiYoutube size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "x" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTwitter size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "linkedin" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "facebook" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiFacebook size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "instagram" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaInstagram size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "website" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <BsGlobe2 size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "github" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "dribbble" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaDribbble size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "behance" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaBehance size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "tiktok" && (
                      <a
                        href={
                          link.url.startsWith("http")
                            ? link.url
                            : "https://" + link.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaTiktok size={25} className="text-black" />
                      </a>
                    )}
                    {link.value === "email" && (
                      <a
                        href={`mailto:${link.url}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <HiOutlineMail size={25} className="text-black" />
                      </a>
                    )}
                  </div>
                ))}
            </div>

            )
            
            }
              <div className="mx-auto max-w-180 ">
                <h2 className="font-medium text-xl text-black dark:text-white">
                  Here is your link: <a className="text-green-600 underline" target="_blank" href={`https://creatorcard.io/${userData.username}`}>creatorcard.io/{userData.username}</a>
                </h2>  
              </div>
              <div>
              <div className=" text-center mt-2 flex pt-2 w-full mx-2 sm:mx-0 justify-center items-center ">
                <div className="flex-row items-center  justify-center space-x-2 space-y-2 sm:space-y-0 flex-grow flex-wrap inline-flex pb-4 text-graydark ">
                {
  hashtags.some((hashtag:any) => hashtag.hashtag) && (
    <div className="flex-row items-center  justify-center  flex-grow flex-wrap inline-flex pb-4 text-graydark ">
      {hashtags.map((hashtag:any, index:number) => (
        hashtag.hashtag && (
          <div
            key={index}
            className="flex items-center justify-center m-1 px-2 py-1 text-sm font-semibold leading-none bg-[#F1F5F9] rounded-full"
          >
            <span className="mr-1 text-black">#</span>
            {hashtag.hashtag}
          </div>
        )
      ))}
    </div>
  )
}
                </div>
              </div>
            </div>
            
              <div className="dark:bg-[#37404F] mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-2 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark">
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white blur">
                    250
                  </span>
                  <span className="text-sm">Purchases</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <span className="font-semibold text-black dark:text-white blur">
                    2k
                  </span>
                  <span className="text-sm">visits</span>
                </div>
              </div>
              
              <div className="mx-auto mt-1 max-w-180">
                <h2 className="font-medium text-xl text-black dark:text-white">
                  Your Bio
                </h2>
                <p className="mt-2 font-medium text-sm">
                  {userData.bio}
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
