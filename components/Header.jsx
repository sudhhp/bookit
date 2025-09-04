"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BsBuildingFillAdd } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiHome9Fill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { RiUser6Fill } from "react-icons/ri";
import destroySession from "@/actions/destroySession";
import { RiLoginCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { BsBuildingFillCheck } from "react-icons/bs";
import { RiAddLargeLine } from "react-icons/ri";
import { Database } from "lucide-react";
const Header = () => {
  const [date, setDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    setDate(today.toLocaleDateString("fa-IR", options));
  }, []);
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      toast.error(error);
    }
  };
  return (
    <>
      <header className="bg-gray-100">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  className="h-12 w-12"
                  src={logo}
                  alt="Bookit"
                  width={100}
                  height={50}
                />
              </Link>
              <p className="text-gray-500 px-2 mt-1 text-sm font-medium">
                {date}
              </p>
              <FaCircle className="inline mr-1 text-xs text-gray-700" />

              <div className="hidden md:block">
                <div className="ml-3 flex items-baseline space-x-4">
                  <Link href="/">
                    <RiHome9Fill className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                  </Link>
                  {/* <!-- Logged In Only --> */}
                  {isAuthenticated && (
                    <>
                      <Link
                        href="/bookings"
                        // className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                      >
                        <BsBuildingFillCheck className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                        رزرو
                      </Link>
                      <Link
                        href="/rooms/add"
                        // className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                      >
                        <BsBuildingFillAdd className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                        اضافه کردن اتاق
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* <!-- Right Side Menu --> */}
            <div className="ml-auto">
              <div className="ml-4 flex items-center md:ml-6">
                {/* <!-- Logged Out Only --> */}
                {!isAuthenticated && (
                  <>
                    <Link
                      href="/login"
                      className="mr-3 text-gray-800 hover:text-gray-600"
                    >
                      <RiLoginCircleFill className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      ورود
                    </Link>
                    <Link
                      href="/register"
                      // className="mr-3 text-gray-800 hover:text-gray-600"
                    >
                      <RiUser6Fill className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      ثبت نام
                    </Link>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <Link href="/rooms/my">
                      <FaBuilding className="inline mr-1 t0ext-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      اتاق
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="mx-3 text-gray-800 hover:text-gray-600"
                    >
                      <RiLogoutCircleLine className="inline mr-1 t0ext-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      خروج
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* <!-- Mobile menu --> */}
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
            >
              <RiHome9Fill className="inline mr-1 text-gray-700" />
              اتاق ها
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/bookings"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                >
                  رزرو
                </Link>
                <Link
                  href="/rooms/add"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                >
                  اضافه کردن اتاق
                </Link>
              </>
            )}
            {/* <!-- Logged In Only --> */}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
