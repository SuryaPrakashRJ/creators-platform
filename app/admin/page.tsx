"use client";
import { redirect } from "next/navigation";

const Page = () => {
  redirect("/admin/profile");
  return (
    <div className="flex flex-col space-y-4  text-center justify-center">
      <h1>Dashboard Page</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default Page;