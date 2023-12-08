"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function page({
  searchParams,
}: {
  searchParams: {
    id: string;
    heading: string;
    subheading: string;
    description: string;
    pricing: string;
    image: string;
    buttonText: string;
  };
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(name, email);

    try {
      const res = await fetch(
        "https://creator-platform-backend.onrender.com/api/v1/checkout/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            name,
            email,
            productid: searchParams.id,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (data.message === "Email sent successfully") {
        router.push("/successpage?url=" + data.attachmentUrl);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <Image
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={searchParams.image}
            width={720}
            height={600}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {searchParams.subheading}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {searchParams.heading}
            </h1>

            <p className="py-3 leading-relaxed">{searchParams.description}</p>

            <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                  Name
                </label>
                <input
                  required
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                  Email
                </label>
                <input
                  required
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring "
                />
              </div>
            </form>

            <div className="flex py-6">
              <span className="title-font font-medium text-2xl text-gray-900">
                {searchParams.pricing === "0"
                  ? "Free"
                  : `Price: ${searchParams.pricing}`}
              </span>
              <button
                onClick={handleSubmit}
                className="flex ml-auto text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded"
              >
                {searchParams.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
