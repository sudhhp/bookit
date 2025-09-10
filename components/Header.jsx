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
import { FaLocationArrow } from "react-icons/fa6";
const Header = ({ initialUser = null, initialIsAuthenticated = false }) => {
  const [date, setDate] = useState("");
  const [user, setUser] = useState(initialUser);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, initialIsAuthenticated]);

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    setDate(today.toLocaleString("fa-IR", options));
  }, []);

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
    <nav className="bg-blue-50 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul>
            <li>
              <Link
                href="/"
                className="flex items-center space-x-1 rtl:space-x-reverse"
              >
                <Image src={logo} alt="Bookit" width={48} height={48} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  o o k i t
                </span>
              </Link>
            </li>
            <li>
              <span className="text-gray-500 text-sm font-medium hidden md:block">
                {date}
              </span>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* User avatar */}
          <div className="relative">
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="group flex items-center transition-all"
              >
                {/* Arrow Icon */}
                <FaLocationArrow
                  className={`
        size-5 mr-2 text-gray-500 transition-transform duration-300
      
        group-focus:rotate-90 group-focus:text-indigo-500
        ${isUserMenuOpen ? "rotate-90 text-indigo-600" : ""}
      `}
                />

                {/* Profile Image */}
                <div className="relative">
                  <Image
                    className="w-10 h-10 rounded-full shadow-2xl ring-2 ring-transparent group-hover:ring-indigo-400 group-focus:ring-indigo-500 transition-all"
                    src="/images/profile-picture-4.jpg"
                    alt="user photo"
                    width={40}
                    height={40}
                  />
                  {/* Optional glowing effect */}
                  <span
                    className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                      isUserMenuOpen
                        ? "ring-2 ring-indigo-400 opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </div>
              </button>
            )}

            {!isAuthenticated && (
              <>
                <ul className="py-2 flex">
                  <li>
                    {" "}
                    <Link
                      href="/login"
                      className="block px-1 text-sm text-gray-800 hover:text-gray-600"
                    >
                      <RiLoginCircleFill className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      ورود
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block px-1 text-sm text-gray-800 hover:text-gray-600"
                    >
                      <RiUser6Fill className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      ثبت نام
                    </Link>
                  </li>
                </ul>
              </>
            )}
            {/* User dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      href="/rooms/add"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                    >
                      <BsBuildingFillAdd className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      اضافه کردن اتاق
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bookings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                    >
                      <BsBuildingFillCheck className="inline mr-1 text-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      رزرو
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/rooms/my"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                    >
                      <FaBuilding className="inline mr-1 t0ext-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      اتاق
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200"
                    >
                      <RiLogoutCircleLine className="inline mr-1 t0ext-gray-700 text-2xl hover:text-2xl hover:text-gray-300" />
                      خروج
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
