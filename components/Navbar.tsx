import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <nav className="bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href='/' className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Zello
            </span>
          </a>
          {session?.user ? (
            <div className="flex items-center space-x-24">
              <div>
                <h1>Welcome {session?.user?.name}</h1>
              </div>
              <UserAccountNav />
            </div>
          ) : (
            <div className="flex items-center">
              <a
                href="/sign-up"
                className="mr-6 text-sm  text-white hover:underline"
              >
                Register
              </a>
              <a
                href="/sign-in"
                className="text-sm  text-white hover:underline"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
