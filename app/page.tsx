'use client'
import Navbar from "@/components/landing-page/Navbar/Navbar";
import Hero from "@/components/landing-page/Hero/Hero";
export default function page() {
  console.log(process.env.NEXT_PUBLIC_BACKENDURL);
  return (
    <div>
      <div className="bg-green-950 bg-gradient-to-b from-green-950 via-transparent h-screen">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}
