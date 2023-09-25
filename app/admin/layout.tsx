"use client";
import "../globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import  { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/dashboard/common/Loader";
import Sidebar from "@/components/dashboard/common/Sidebar";
import Header from "@/components/dashboard/common/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {values} = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();

 useEffect(() => {
  async function fetchData() {
    const res = await fetch(`https://creators-platform-backend-production.up.railway.app/api/v1/users/${session?.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }

    );
    const data = await res.json();
    values(data)
  }
  fetchData();
  setTimeout(() => {
    setLoading(false);
  }, 1500);
 }, []);

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              {/* <!-- ===== Header Start ===== --> */}
              <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              {/* <!-- ===== Header End ===== --> */}

              {/* <!-- ===== Main Content Start ===== --> */}
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                  {children}
                </div>
              </main>
              {/* <!-- ===== Main Content End ===== --> */}
            </div>
            {/* <!-- ===== Content Area End ===== --> */}
          </div>
        )}
      </div>
    </>
  );
}
