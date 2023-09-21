import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import { UserProvider } from "@/context/userContext";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CreatorsCard",
  description: "Connecting Creators to their Fans",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
      <UserProvider>
        <Provider session={session}>
          <main>{children}</main>
          <Toaster />
        </Provider>
        </UserProvider>
      </body>
    </html>
  );
}
